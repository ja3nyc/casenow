"use client";
export default function Footer() {
  return (
    <footer className="bg-white border-t max-h-14 h-full border-gray-200 p-4 text-center text-sm text-gray-500">
      <p>
        © 2024 CaseBot. All rights reserved.{" "}
        <a href="#" className="text-indigo-600 hover:underline">
          Terms
        </a>{" "}
        ·{" "}
        <a href="#" className="text-indigo-600 hover:underline">
          Privacy
        </a>
      </p>
    </footer>
  );
}
