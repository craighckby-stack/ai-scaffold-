model EncryptionKey {
  id          String    @id @default(cuid())

  // Core Key Material (Must be mandatory)
  publicKey   String
  privateKey  String
  data        String    @default("")

  // Metadata
  algorithm   String    @default("AES-256-GCM")
  usage       String

  // Key Lifecycle Timestamps (Standardized to DateTime for Consistency)
  created     DateTime  // Replaced BigInt
  expires     DateTime? // Replaced BigInt and made optional, as not all keys expire

  // Status and Audit Timestamps
  active      Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Optimized Indices
  @@index([active])
  @@index([usage, active])
}