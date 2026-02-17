export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-10 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tighter text-white">AIRIS</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Artificial Intelligence Research and Innovation Society
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
        </div>
        
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} AIRIS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
