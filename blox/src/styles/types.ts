export interface STYLE_TYPES {
  Switch: {
    input: {
      bgColor: string;
    };
    thumb: {
      bgColor: string;
    };
    track: {
      bgColor: string;
    };
    label: {
      spacing: string;
    };
  };
  Radio: {
    error: {
      color: string;
    };
    label: {
      color: string;
    };
    size: string;
  };
  Slider: {
    thickness: string;
    borderRadius: string;
    track: {
      color: string;
    };
    range: {
      color: string;
    };
    thumb: {
      color: string;
      size: string;
      radius: string;
      shadow: string;
    };
    mark: {
      color: string;
      spacing: string;
      radius: string;
      fontSize: string;
      label: {
        spacing: string;
      };
    };
  };
  Modal: {
    bgColor: string;
    borderRadius: string;
    boxShadow: string;
    maxHeight: string;
    body: {
      padding: string;
    };
    close: {
      right: string;
      top: string;
      color: string;
      padding: string;
      borderRadius: string;
    };
    header: {
      border: string;
      padding: string;
    };
    footer: {
      border: string;
      padding: string;
      gap: string;
    };
    title: {
      fontSize: string;
      fontWeight: string;
      color: string;
    };
    overlay: {
      padding: string;
      bgColor: string;
    };
    width: {
      small: string;
      medium: string;
      large: string;
      full: string;
    };
  };
  DragDrop: {
    droppable: {
      bgColor: string;
      outline: string;
    };
    sortable: {
      opacity: number;
      backgroundColor: string;
      borderRadius: string;
    };
  };
  Drawer: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    minWidth: string;
    maxWidth: string;
    height: string;
    backdropColor: string;
    backdropBlur: string;
    contentBgColor: string;
  };
  Tooltip: {
    offset: string;
  };
}
