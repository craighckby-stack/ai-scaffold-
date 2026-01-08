model EncryptionKey {
  id          String    @id @default(cuid())
  publicKey   String
  privateKey  String
  data        String    @default("")
  algorithm   String    @default("AES-256-GCM")
  created     BigInt
  expires     BigInt
  usage       String
  active      Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([active])
  @@index([usage, active])
}