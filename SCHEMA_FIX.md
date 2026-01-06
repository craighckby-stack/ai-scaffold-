# 🔧 PRISMA SCHEMA FIX NEEDED

## **Issue Identified:**

**Error**: `Inconsistent column data: Conversion failed: Value does not fit in an INT column`

**Root Cause**: The `EncryptionKey` model is missing a `data` field to store encryption keys properly.

## **Current Model (Lines 191-201):**

```prisma
model EncryptionKey {
  id          String   @id @default(cuid())
  publicKey   String
  privateKey  String
  algorithm   String   @default("AES-256-GCM")
  created     Int
  expires     Int
  usage       String
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

## **Problems:**

1. **Missing `data` field**: Tests expect to save `encrypted.data` to `EncryptionKey.data` but field doesn't exist
2. **Wrong field types**: `publicKey`, `privateKey` are String but trying to store large Buffer objects
3. **INT overflow**: Converting Buffer to string creates huge values that overflow INT columns

## **Fix Required:**

### **Option 1: Add `data` field to store encrypted content**
```prisma
model EncryptionKey {
  id          String   @id @default(cuid())
  data        String   @default("")  // Store encrypted data as JSON string
  publicKey   String
  privateKey  String
  algorithm   String   @default("AES-256-GCM")
  created     Int
  expires     Int
  usage       String
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

### **Option 2: Use TEXT type for large key storage**
```prisma
model EncryptionKey {
  id          String   @id @default(cuid())
  data        String   @db.Text  // Use TEXT for large data
  publicKey   String
  privateKey  String
  algorithm   String   @default("AES-256-GCM")
  created     Int
  expires     Int
  usage       String
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

## **Schema Changes Needed:**

1. Add `data` field to `EncryptionKey` model
2. Change `publicKey` and `privateKey` to `TEXT` type (or use `@db.Text`)
3. Run `bun run db:push` to update schema
4. Restart application

## **Priority: HIGH**

This fix is needed to pass security API tests and store encryption keys properly.
