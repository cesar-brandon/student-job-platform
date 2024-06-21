import { PDFUploader } from "@/components/pdf-uploader";

export function AddResumePdf() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Proyectos y trabajos destacados</h2>
      <p className="text-sm">
        Agrega tus proyectos y trabajos destacados para que los empleadores
        sepan más sobre ti.
      </p>
      <PDFUploader />
    </section>
  );
}
