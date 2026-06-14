type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <iframe
      src={`/stitch-v2/detail.html?id=${encodeURIComponent(id)}`}
      className="fixed inset-0 h-screen w-screen border-0"
      title="Vasıtan"
    />
  );
}
