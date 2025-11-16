import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-4xl font-bold mb-4">Pandalla API Documentation</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Comprehensive API documentation for Pandalla AI services
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/docs"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Read Documentation
        </Link>
        <Link
          href="https://api.pandalla.ai"
          className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit API Portal
        </Link>
      </div>
    </div>
  );
}
