/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_PHARMACY_EMAIL: string
  readonly VITE_PHARMACY_PHONE: string
  readonly VITE_PHARMACY_ADDRESS: string
  readonly VITE_NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}