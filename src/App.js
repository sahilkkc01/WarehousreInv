import React, { useState } from "react";
import axios from "axios";

export default function WarehouseInvForm() {
 const [formData, setFormData] = useState({
  warehouseType: "",
  date: "",
  crnNo: "",
  shippingBill: "",
  containerNo: "",
  size: "",
  physicalLocation: [""],
  oldLocation: "",
  noOfPackages: "",
  area: "",
  boe: "",
  fclLcl: "",
  destuffingDate: "",
  commodityDescription: ""
});


  const upperFields = [
    "warehouseType",
    "crnNo",
    "shippingBill",
    "containerNo",
    "oldLocation"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: upperFields.includes(name) ? value.toUpperCase() : value
    }));
  };

  const handlePhysicalChange = (index, value) => {
    const updated = [...formData.physicalLocation];
    updated[index] = value.toUpperCase();
    setFormData(prev => ({
      ...prev,
      physicalLocation: updated
    }));
  };

  const addPhysicalField = () => {
    setFormData(prev => ({
      ...prev,
      physicalLocation: [...prev.physicalLocation, ""]
    }));
  };

  const removePhysicalField = (index) => {
    if (formData.physicalLocation.length > 1) {
      const updated = formData.physicalLocation.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        physicalLocation: updated
      }));
    }
  };

const validateForm = () => {
  const requiredFields = [
  "warehouseType",
  "date",
  "shippingBill",
  "size",
  "noOfPackages",
  "area",
  "commodityDescription"
];


  for (let field of requiredFields) {
    if (!formData[field] || formData[field].toString().trim() === "") {
      alert("All required fields must be filled.");
      return false;
    }
  }

  if (!["EXPORT", "IMPORT"].includes(formData.warehouseType)) {
    alert("Warehouse Type must be EXPORT or IMPORT.");
    return false;
  }

  if (
    formData.physicalLocation.length === 0 ||
    formData.physicalLocation.some(val => !val.trim())
  ) {
    alert("Physical Location is mandatory.");
    return false;
  }

  return true;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("https://kycl.in/api/api/warehouse/inv", {
        ...formData,
        physicalLocation: formData.physicalLocation
      });

      alert("Record Saved Successfully");

    setFormData({
  warehouseType: "",
  date: "",
  crnNo: "",
  shippingBill: "",
  containerNo: "",
  size: "",
  physicalLocation: [""],
  oldLocation: "",
  noOfPackages: "",
  area: "",
  boe: "",
  fclLcl: "",
  destuffingDate: "",
  commodityDescription: ""
});

    } catch (err) {
      console.error(err);
      alert("Error saving record");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Warehouse Inventory</h1>
          <p style={styles.subtitle}>Enter container and location details</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            {/* Warehouse Type */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Warehouse Type <span style={styles.required}>*</span>
              </label>
              <select
                name="warehouseType"
                value={formData.warehouseType}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Select type</option>
                <option value="EXPORT">EXPORT</option>
                <option value="IMPORT">IMPORT</option>
              </select>
            </div>

            {/* Date */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Date <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* CRN No */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                CRN No 
              </label>
              <input
                type="text"
                name="crnNo"
                value={formData.crnNo}
                onChange={handleChange}
                style={{...styles.input, textTransform: 'uppercase'}}
                placeholder="Enter CRN number"
                
              />
            </div>

            {/* Shipping Bill */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Shipping Bill <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="shippingBill"
                value={formData.shippingBill}
                onChange={handleChange}
                style={{...styles.input, textTransform: 'uppercase'}}
                placeholder="Enter shipping bill"
                required
              />
            </div>

            {/* Container No */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Container No 
              </label>
              <input
                type="text"
                name="containerNo"
                value={formData.containerNo}
                onChange={handleChange}
                style={{...styles.input, textTransform: 'uppercase'}}
                placeholder="Enter container number"
                
              />
            </div>

            {/* Container Size */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Container Size <span style={styles.required}>*</span>
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Select size</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
            </div>

            {/* No of Packages */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                No of Packages <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="noOfPackages"
                value={formData.noOfPackages}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter number"
                min="1"
                required
              />
            </div>

            {/* Area */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Area <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="area"
                value={formData.area}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter area"
                required
              />
            </div>

        <div style={styles.formGroup}>
  <label style={styles.label}>BOE</label>
  <input
    type="text"
    name="boe"
    value={formData.boe}
    onChange={handleChange}
    style={{...styles.input, textTransform: 'uppercase'}}
    placeholder="Enter BOE (optional)"
  />
</div>
<div style={styles.formGroup}>
  <label style={styles.label}>FCL / LCL</label>
  <select
    name="fclLcl"
    value={formData.fclLcl}
    onChange={handleChange}
    style={styles.select}
  >
    <option value="">-- Select --</option>
    <option value="FCL">FCL</option>
    <option value="LCL">LCL</option>
  </select>
</div>

<div style={styles.formGroup}>
  <label style={styles.label}>Destuffing Date</label>
  <input
    type="date"
    name="destuffingDate"
    value={formData.destuffingDate}
    onChange={handleChange}
    style={styles.input}
  />
</div>
<div style={styles.formGroup}>
  <label style={styles.label}>
    Commodity Description <span style={styles.required}>*</span>
  </label>
  <input
    type="text"
    name="commodityDescription"
    value={formData.commodityDescription}
    onChange={handleChange}
    style={{...styles.input, textTransform: 'uppercase'}}
    placeholder="Enter commodity description"
    required
  />
</div>

            {/* Old Location */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Old Location</label>
              <input
                type="text"
                name="oldLocation"
                value={formData.oldLocation}
                onChange={handleChange}
                style={{...styles.input, textTransform: 'uppercase'}}
                placeholder="Enter old location (optional)"
              />
            </div>
          </div>

          {/* Physical Location - Full Width Section */}
          <div style={styles.physicalLocationSection}>
            <label style={styles.label}>
              Physical Location <span style={styles.required}>*</span>
            </label>
            <div style={styles.physicalLocationGrid}>
              {formData.physicalLocation.map((loc, index) => (
                <div key={index} style={styles.physicalLocationItem}>
                  <input
                    type="text"
                    value={loc}
                    onChange={(e) => handlePhysicalChange(index, e.target.value)}
                    style={{...styles.input, textTransform: 'uppercase'}}
                    placeholder={`Location ${index + 1}`}
                    required
                  />
                  {formData.physicalLocation.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhysicalField(index)}
                      style={styles.removeButton}
                      title="Remove location"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addPhysicalField}
              style={styles.addButton}
            >
              <span style={styles.addButtonIcon}>+</span>
              Add Physical Location
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.submitButton}>
            Submit Inventory
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "900px",
    width: "100%",
    overflow: "hidden"
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "32px 24px",
    color: "white",
    textAlign: "center"
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    opacity: 0.9,
    fontWeight: "400"
  },
  form: {
    padding: "32px 24px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    letterSpacing: "0.3px"
  },
  required: {
    color: "#ef4444",
    marginLeft: "2px"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    outline: "none",
    backgroundColor: "#ffffff",
    boxSizing: "border-box"
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    outline: "none",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    boxSizing: "border-box"
  },
  physicalLocationSection: {
    marginBottom: "24px",
    padding: "24px",
    background: "#f9fafb",
    borderRadius: "12px",
    border: "2px solid #e5e7eb"
  },
  physicalLocationGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px"
  },
  physicalLocationItem: {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },
  removeButton: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    border: "2px solid #fee2e2",
    background: "#ffffff",
    color: "#ef4444",
    borderRadius: "8px",
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "400",
    lineHeight: "1"
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 20px",
    background: "#ffffff",
    border: "2px dashed #9ca3af",
    borderRadius: "8px",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%"
  },
  addButtonIcon: {
    fontSize: "20px",
    fontWeight: "400"
  },
  submitButton: {
    width: "100%",
    padding: "16px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    letterSpacing: "0.5px"
  }
};

// Add media query styles via a style tag
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    input:focus, select:focus {
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    
    button:hover {
      transform: translateY(-1px);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .submit-button:hover {
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5) !important;
    }
    
    .remove-button:hover {
      background: #fee2e2 !important;
      border-color: #ef4444 !important;
    }
    
    .add-button:hover {
      border-color: #667eea !important;
      color: #667eea !important;
      background: #f0f4ff !important;
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}