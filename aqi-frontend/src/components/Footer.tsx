import { Wind } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary py-12 border-t border-border">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-primary text-white">
                            <Wind className="w-5 h-5" />
                        </div>
                        <span className="font-serif font-bold text-xl text-primary">AirCast</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        © 2026 B.Tech AI & DS Final Year Project | Contact: 7397066177 | pixelsquad4@gamil.com
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
