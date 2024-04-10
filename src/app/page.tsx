import Markdown from "react-markdown";

const markdown = `
# Benvinguts

## Segon títol

El nou web de l’associació

- Primer element
- Segon

1. U
2. Dos
`;

export default function Home() {
  return (
    <main className="prose">
      <Markdown>{markdown}</Markdown>
    </main>
  );
}
