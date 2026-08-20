import crypto from "crypto";

interface EsewaSignatureParams {
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
}

export function generateEsewaSignature({
  total_amount,
  transaction_uuid,
  product_code,
}: EsewaSignatureParams): string {
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const secretKey = process.env.ESEWA_SECRET_KEY!;

  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

  return hash;
}
