interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-10 py-20">
        {children}
      </div>
    </main>
  );
}
