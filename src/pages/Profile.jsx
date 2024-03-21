import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import service from "../services/config.services";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    currentLevel: "",
    goal: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await service.get("/profile");
        setUserProfile(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al conseguir el perfil de usuario:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({
      height: userProfile.height,
      weight: userProfile.weight,
      currentLevel: userProfile.currentLevel,
      goal: userProfile.goal,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/profile/password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setEditPasswordMode(false);
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/profile/email", {
        email: formData.newEmail,
        password: formData.currentPassword,
      });
      setEditEmailMode(false);
      setFormData({
        ...formData,
        currentPassword: "",
        newEmail: "",
      });
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/profile", formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error editando el perfil de usuario:", error);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0]; // Obtenemos el archivo de la imagen seleccionada

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cde8cw2i"); // Reemplaza "YOUR_UPLOAD_PRESET" con tu valor de upload preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddwwfoqzl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const data = await res.json();
        setProfilePic(data.secure_url);
      } else {
        console.error("Error uploading profile picture:", res.statusText);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Perfil</h2>
          <div>
            {/* Mostrar la foto de perfil */}
            <img
              src={formData.profilePic}
              alt="Foto de perfil"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            {/* Permitir al usuario cambiar la foto de perfil */}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </div>
          {!editMode ? (
            <div>
              {/* Mostrar detalles del perfil */}
              <p>Nombre: {userProfile.name}</p>
              <p>Apellidos: {userProfile.lastName}</p>
              <p>Email: {userProfile.email}</p>
              <p>Edad: {userProfile.age}</p>
              <p>Sexo: {userProfile.sex}</p>
              <p>Altura: {userProfile.height}</p>
              <p>Peso: {userProfile.weight}</p>
              <p>Nivel actual: {userProfile.currentLevel}</p>
              <p>Objetivo: {userProfile.goal}</p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <label>
                  Estatura:
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Peso:
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Nivel actual:
                  <select
                    name="currentLevel"
                    value={formData.currentLevel}
                    onChange={handleChange}
                  >
                    <option value="Bajo">Bajo</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </label>
                <label>
                  Objetivo:
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                  >
                    <option value="Perdida de grasa">Perdida de grasa</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Ganancia muscular">Ganancia muscular</option>
                  </select>
                </label>
                <button type="submit">Guardar</button>
              </form>
              <button onClick={() => setEditPasswordMode(true)}>
                Cambiar contraseña
              </button>
              <button onClick={() => setEditEmailMode(true)}>
                Cambiar email
              </button>
            </>
          )}
          {editPasswordMode && (
            <form onSubmit={handlePasswordChange}>
              <label>
                Contraseña actual:
                <input
                  type="password"
                  name="currentPassword"
                  value=""
                  onChange={handleChange}
                />
              </label>
              <label>
                Nueva contraseña:
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </label>
              <label>
                Repetir contraseña:
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Cambiar contraseña</button>
            </form>
          )}
          {editEmailMode && (
            <form onSubmit={handleEmailChange}>
              <label>
                Nuevo email:
                <input
                  type="email"
                  name="newEmail"
                  value=""
                  onChange={handleChange}
                />
              </label>
              <label>
                Current Password:
                <input
                  type="password"
                  name="currentPassword"
                  value=""
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Cambiar email</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
