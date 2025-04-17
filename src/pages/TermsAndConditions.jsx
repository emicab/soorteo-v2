import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "1. Naturaleza del servicio",
    content: `Esta plataforma permite a los usuarios crear y participar en sorteos digitales con fines recreativos, promocionales o benéficos. 
El creador del sorteo es responsable exclusivo de premios, condiciones y cumplimiento. La plataforma actúa solo como intermediario tecnológico.`,
  },
  {
    title: "2. Participación",
    content: `Algunos sorteos requieren pago por número, otros son gratuitos. Participás bajo tu propia responsabilidad, aceptando los riesgos del uso de la plataforma.`,
  },
  {
    title: "3. Sorteos con pago",
    content: `Los sorteos pagos pueden ser considerados juegos de azar según las leyes locales. El organizador es responsable de cumplir la normativa legal correspondiente.`,
  },
  {
    title: "4. Entrega de premios",
    content: `El organizador es responsable exclusivo de entregar el premio. La plataforma puede mediar en conflictos, pero no garantiza resultados.`,
  },
  {
    title: "5. Elección del ganador",
    content: `Los sorteos deben realizarse mediante sistemas verificables y justos. El resultado es definitivo, salvo prueba de error técnico o fraude.`,
  },
  {
    title: "6. Política de reembolsos",
    content: `No hay reembolsos salvo que el sorteo se cancele antes de realizarse o haya un error técnico demostrable.`,
  },
  {
    title: "7. Requisitos legales y fiscales",
    content: `Organizadores que generen ingresos deben cumplir con la normativa fiscal correspondiente (ej. estar inscriptos en AFIP si están en Argentina).`,
  },
  {
    title: "8. Prohibiciones",
    content: `Está prohibido realizar sorteos falsos, no entregar premios, simular sorteos gratuitos que son pagos, o usar la plataforma para actividades ilegales.`,
  },
  {
    title: "9. Modificaciones",
    content: `Estos términos pueden cambiar. Se notificará por correo o dentro de la plataforma a los usuarios registrados.`,
  },
  {
    title: "10. Contacto",
    content: `Para consultas o denuncias, escribinos a: contacto@rifalo.com.ar`,
  },
];

export default function TermsAndConditions() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-8 rounded-2xl shadow-md bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Términos y Condiciones
      </h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-4 border-b border-gray-200">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center py-3 text-left font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <span>{section.title}</span>
            {openIndex === index ? (
              // <ChevronUp className="w-5 h-5" />
              <p>👆</p>
            ) : (
              // <ChevronDown className="w-5 h-5" />
              <p>👇</p>
            )}
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden text-sm text-gray-600 pb-4"
              >
                <p>{section.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
