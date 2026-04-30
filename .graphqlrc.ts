import { ApiType, pluckConfig, preset } from "@shopify/api-codegen-preset"

const SCHEMA = "./schema/storefront.schema.json"
const DOCUMENTS = ["./registry/**/*.fragment.ts"]

export default {
  projects: {
    storefront: {
      schema: SCHEMA,
      documents: DOCUMENTS,
      extensions: {
        codegen: {
          pluckConfig,
          generates: {
            "./generated/storefront.types.ts": {
              schema: SCHEMA,
              plugins: ["typescript"],
              config: {
                enumsAsConst: true,
                defaultScalarType: "string",
              },
            },
            "./generated/storefront.generated.ts": {
              schema: SCHEMA,
              documents: DOCUMENTS,
              preset,
              presetConfig: {
                apiType: ApiType.Storefront,
              },
            },
          },
        },
      },
    },
  },
}
