import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateAccountForm from "../create-account/CreateAccountForm";
import CompleteProfile from "../complete-profile/CompleteProfile";

// Define the animation variants
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
};

export default function SignupFlow() {
  const [[step, direction], setStep] = useState([1, 0]);
  const [createAccountData, setCreateAccountData] = useState({
    full_name: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    showPassword: false,
    selected_language: "en",
    consent: false,
  });
  const [selectedRole, setSelectedRole] = useState("refugee");
  const [needs, setNeeds] = useState({
    shelter: true,
    food: true,
    medcine: false,
    legal: true,
  });
  const [familyStatus, setFamilyStatus] = useState({
    familyMembers: "",
    children: "",
  });
  const [serviceArea, setServiceArea] = useState("");

  const nextStep = () => setStep([2, 1]);
  const prevStep = () => setStep([1, -1]);

  const updateCreateAccountField = (field, value) => {
    setCreateAccountData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNeed = (key) => {
    setNeeds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{ overflow: "hidden", position: "relative", minHeight: "100vh" }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CreateAccountForm
              onNext={nextStep}
              formData={createAccountData}
              onFieldChange={updateCreateAccountField}
            />
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CompleteProfile
              onBack={prevStep}
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              needs={needs}
              onToggleNeed={toggleNeed}
              familyStatus={familyStatus}
              onFamilyStatusChange={setFamilyStatus}
              serviceArea={serviceArea}
              formData={createAccountData}
              onServiceAreaChange={setServiceArea}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
