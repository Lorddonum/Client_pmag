import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Small delay so it doesn't instantly jump scare the user
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Popup Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 max-w-lg w-full max-h-[90vh] flex flex-col items-center justify-center"
                    >
                        {/* Close Button - positioned absolutely to the image container */}
                        <div className="relative inline-block max-w-full max-h-full">
                            <button
                                onClick={handleClose}
                                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-xl hover:bg-gray-100 hover:scale-110 transition-all z-20"
                                aria-label="Close popup"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <img
                                src="/popup-invitation.png"
                                alt="Paralight & Maglinear Lighting Invitation"
                                className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
