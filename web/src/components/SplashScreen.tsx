import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"


export const SplashScreen = () => {
    return (
        <section className="flex items-center justify-center h-screen space-y-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}

            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="rounded-full h-5 w-5 bg-primary">
                    <Loader2 className="animate-spin" />
                    </span>
                </motion.div>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Loading RoleRadar
                </motion.p>
            </motion.div>
        </section>
    );
}; 