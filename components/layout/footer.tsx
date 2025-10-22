export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm text-center">
          &copy; {currentYear} Stealth Quest - Experimentation Agent. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
