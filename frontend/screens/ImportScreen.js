import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "../Config/axios";

export default function ImportScreen() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const pickFile = async () => {
    try {
      setError("");
      setMessage("");

      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setMessage("File selection canceled.");
        return;
      }

      const selectedFile = result.assets[0];

      const fileName = selectedFile.name.toLowerCase();
      const isExcel = fileName.endsWith(".xls") || fileName.endsWith(".xlsx");

      if (!isExcel) {
        setError("Please select an Excel file (.xlsx or .xls)");
        return;
      }

      setFile(selectedFile);
      setMessage(`File selected: ${selectedFile.name}`);
    } catch (err) {
      console.log("File picker error:", err);
      setError("Failed to select file. Please try again.");
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("excel", {
        uri: file.uri,
        name: file.name || "employees.xlsx",
        type:
          file.mimeType ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      console.log("Uploading file:", file.name);

      const response = await axios.post("/api/employees/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
       
      });

      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("File uploaded successfully!");
      }

      setFile(null);
    } catch (err) {
      console.log("Upload error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      let errorMessage = "Upload failed. Please try again.";

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const clearAll = () => {
    setFile(null);
    setError("");
    setMessage("");
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Import Employee Data
      </Text>

      <Text style={{ marginBottom: 30, textAlign: "center", color: "#666" }}>
        Select an Excel file 
      </Text>

      <TouchableOpacity
        onPress={pickFile}
        style={{
          backgroundColor: "#007AFF",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          alignItems: "center",
        }}
        disabled={uploading}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Choose Excel File
        </Text>
      </TouchableOpacity>

      {file && (
        <View
          style={{
            backgroundColor: "#f0f8ff",
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Selected File:
          </Text>
          <Text style={{ marginBottom: 5 }}>{file.name}</Text>
          <Text style={{ fontSize: 12, color: "#666" }}>
            Size: {(file.size / 1024).toFixed(2)} KB
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={uploadFile}
        style={{
          backgroundColor: file ? "#34C759" : "#CCC",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          opacity: file ? 1 : 0.6,
        }}
        disabled={!file || uploading}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          {uploading ? "Uploading..." : "Upload to Server"}
        </Text>
      </TouchableOpacity>

      {uploading && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10, color: "#666" }}>
            Uploading file to server...
          </Text>
        </View>
      )}

      {error ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: 10,
              padding: 10,
              backgroundColor: "#ffe6e6",
              borderRadius: 5,
            }}
          >
            {error}
          </Text>
          <TouchableOpacity onPress={clearAll}>
            <Text style={{ color: "#007AFF", textDecorationLine: "underline" }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {message ? (
        <Text
          style={{
            color: "green",
            textAlign: "center",
            marginTop: 20,
            padding: 10,
            backgroundColor: "#e6ffe6",
            borderRadius: 5,
          }}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}
