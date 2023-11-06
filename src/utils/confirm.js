import { confirmAlert } from "react-confirm-alert";

import CustomConfirm from "@/components/CustomConfirm";

export const confirmAndRunCustom = (onSave, values) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <CustomConfirm
          onClose={onClose}
          onConfirm={() => {
            onSave(values);
          }}
          className="test"
        />
      );
    },
  });
};

export const confirmAndRun = (onSave, arg) => {
  confirmAlert({
    buttons: [
      {
        label: "Save changes",
        className: "save",
        onClick: () => onSave(arg),
      },
      {
        label: "Cancel",
        className: "cancel",
        onClick: () => {},
      },
    ],
  });
};
