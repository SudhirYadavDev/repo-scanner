interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="h-screen overflow-hidden">
      <div className="mx-auto flex h-[calc(100vh-2rem)] w-full max-w-6xl flex-col px-10 pt-6 pb-6">
        {children}
      </div>
    </main>
  );
}