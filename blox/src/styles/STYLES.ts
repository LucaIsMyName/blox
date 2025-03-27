export let STYLES = {
  Radio: {
    error: {
      color: "#dc3545",
    },
    label: {
      color: "#495057",
    },
    size: "16px",
  },
  Slider: {
    thickness: "4px",
    borderRadius: "9999px",
    track: {
      color: "#e9ecef",
    },
    range: {
      color: "#007bff",
    },
    thumb: {
      color: "#007bff",
      size: "16px",
      radius: "9999px",
      shadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    mark: {
      color: "#007bff",
      spacing: "8px",
      radius: "9999px",
      fontSize: "0.75rem",
      label: {
        spacing: "4px",
      },
    },
  },
  Modal: {
    bgColor: "#ffffff",
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxHeight: "calc(100vh-32px)",
    body: {
      padding: "16px",
    },
    close: {
      right: "16px",
      top: "16px",
      color: "#6c757d",
      padding: "8px",
      borderRadius: "4px",
    },
    header: {
      border: "1px solid gray",
      padding: "16px",
    },
    footer: {
      border: "1px solid gray",
      padding: "16px",
      gap: "8px",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "inherit",
    },
    overlay: {
      padding: "16px",
      bgColor: "rgba(0, 0, 0, 0.5)",
    },
    width: {
      small: "300px",
      medium: "600px",
      large: "900px",
      full: "100%",
    },
  },
  DragDrop: {
    droppable: {
      bgColor: "#f8f9fa",
      outline: "2px dashed #007bff",
    },
    sortable: {
      opacity: 0.5,
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: "4px",
    },
  },
  Drawer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minWidth: "300px",
    maxWidth: "600px",
    height: "100%",
    backdropColor: "rgba(0, 0, 0, 0.5)",
    backdropBlur: "0px",
    contentBgColor: "#ffffff",
  },
  Tooltip: {
    offset: "8px",
  },
};
