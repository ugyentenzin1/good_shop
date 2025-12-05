export default function DifferentPage({ params }: { params: { slug: string[] } }) {
    console.log(params);
  return (
    <div>
      <h1>DifferentPage</h1>
      <p>{params.slug}</p>
    </div>
  );
}