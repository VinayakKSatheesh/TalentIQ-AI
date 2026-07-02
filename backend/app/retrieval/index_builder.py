"""
Index Builder

Builds the FAISS vector index and SQLite metadata database.
"""

from __future__ import annotations

import logging
from pathlib import Path

from tqdm import tqdm

from app.services.loader import stream_jsonl
from app.services.parser import parse_candidate
from app.services.document import build_candidate_document
from app.models.candidate import Candidate

from app.retrieval.embedding import EmbeddingService
from app.retrieval.vector_store import VectorStore
from app.retrieval.metadata_store import MetadataStore


logger = logging.getLogger(__name__)


class IndexBuilder:
    """
    Builds the semantic search index.

    Pipeline:

    JSONL
        ↓
    Candidate
        ↓
    Document
        ↓
    Embedding
        ↓
    FAISS
        ↓
    SQLite
    """

    def __init__(
        self,
        dataset_path: Path,
        index_path: Path,
        metadata_path: Path,
        batch_size: int = 128,
        rebuild_vectors: bool = True, 
    ) -> None:

        self.dataset_path = dataset_path
        self.index_path = index_path
        self.metadata_path = metadata_path
        self.batch_size = batch_size
        
        logger.info("Initializing embedding service...")
        self.embedding = EmbeddingService()

        logger.info("Initializing vector store...")
        self.vector_store = VectorStore(
            self.embedding.dimension()
        )

        logger.info("Initializing metadata store...")
        self.metadata_store = MetadataStore(
            metadata_path
        )

        self.vector_id = 0
        self.rebuild_vectors = rebuild_vectors
    def process_batch(
        self,
        candidates: list[Candidate]
    ) -> None:
        """
        Process a batch of candidates.

        Steps:
        1. Convert candidates to searchable documents.
        2. Generate embeddings.
        3. Store embeddings in FAISS.
        4. Store metadata in SQLite.
        """

        if not candidates:
            return

        # Build searchable documents
        documents = [
            build_candidate_document(candidate)
            for candidate in candidates
        ]
        if self.rebuild_vectors:
            # Generate embeddings
            embeddings = self.embedding.embed_batch(documents)

            # Add vectors to FAISS
            self.vector_store.add(embeddings)


        # Store metadata
        for candidate in candidates:

            self.metadata_store.insert(
                vector_id=self.vector_id,
                candidate=candidate,
            )

            self.vector_id += 1
    def build(self) -> None:
        """
        Build the complete semantic index.
        """

        logger.info("=" * 60)
        logger.info("Starting TalentIQ Index Builder")
        logger.info("=" * 60)

        batch: list[Candidate] = []
        processed = 0

        try:

            for raw in tqdm(
                stream_jsonl(self.dataset_path),
                desc="Indexing Candidates",
            ):

                candidate = parse_candidate(raw)

                batch.append(candidate)
                processed += 1

                if len(batch) >= self.batch_size:

                    self.process_batch(batch)
                    batch.clear()

            # Process remaining candidates
            if batch:
                self.process_batch(batch)

            if self.rebuild_vectors:
                logger.info("Saving FAISS index...")
                self.vector_store.save(self.index_path)

            logger.info("Saving metadata database...")

            self.metadata_store.commit()

            logger.info("=" * 60)
            logger.info("Index build completed successfully.")
            logger.info("Candidates processed : %d", processed)
            logger.info("Vectors stored       : %d", self.vector_store.size)
            logger.info("Metadata records     : %d", self.metadata_store.count())
            logger.info("=" * 60)

        finally:

            self.metadata_store.close()   