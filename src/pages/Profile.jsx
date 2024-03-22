import { useState, useEffect } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Image } from "react-bootstrap";

function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  const [formData, setFormData] = useState({
    profilePic: "",
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

  const refreshUserProfile = async () => {
    try {
      const res = await service.get("/profile");
      setUserProfile(res.data);
    } catch (error) {
      console.error("Error al conseguir el perfil de usuario:", error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/profile", formData);
      setEditMode(false);
      refreshUserProfile(); // Actualizar el perfil después de enviar los cambios
    } catch (error) {
      console.error("Error editando el perfil de usuario:", error);
    }
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
      refreshUserProfile(); // Actualizar el perfil después de cambiar la contraseña
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
      refreshUserProfile(); // Actualizar el perfil después de cambiar el correo electrónico
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);

      const profilePic = response.data.imageUrl;

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        profilePic: profilePic,
      }));

      setIsUploading(false);
      setShowEditPhoto(false); // Ocultar el formulario después de cargar la imagen
    } catch (error) {
      console.error("Error uploading image:", error);
      navigate("/error");
    }
  };

  const toggleEditPhoto = () => {
    setShowEditPhoto(!showEditPhoto);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Perfil de {userProfile.name}</h2>
          <Row className="flex-wrap">
            <Col md={3} className="mb-3">
              {userProfile.profilePic ? (
                <div>
                  <Image
                    src={userProfile.profilePic}
                    alt="Profile Pic"
                    width={200}
                  />
                </div>
              ) : null}
              {!showEditPhoto ? (
                <Button onClick={toggleEditPhoto}>Editar foto de perfil</Button>
              ) : (
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Editar foto de perfil:</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </Form.Group>
              )}
              {isUploading ? <p>Subiendo imagen...</p> : null}
            </Col>
            <Col md={9} className="mb-3">
              {!editMode ? (
                <div>
                  <p>Nombre: {userProfile.name}</p>
                  <p>Apellidos: {userProfile.lastName}</p>
                  <p>Email: {userProfile.email}</p>
                  <p>Edad: {userProfile.age}</p>
                  <p>Sexo: {userProfile.sex}</p>
                  <p>Altura: {userProfile.height}</p>
                  <p>Peso: {userProfile.weight}</p>
                  <p>Nivel actual: {userProfile.currentLevel}</p>
                  <p>Objetivo: {userProfile.goal}</p>
                  <Button onClick={handleEditClick}>Editar</Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit} className="mb-3">
                  <Form.Group controlId="formHeight" className="mb-3">
                    <Form.Label>Estatura:</Form.Label>
                    <Form.Control
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="mb-3"
                    />
                  </Form.Group>
                  <Form.Group controlId="formWeight">
                    <Form.Label>Peso:</Form.Label>
                    <Form.Control
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="mb-3"
                    />
                  </Form.Group>
                  <Form.Group controlId="formCurrentLevel" className="mb-3">
                    <Form.Label>Nivel actual:</Form.Label>
                    <Form.Control
                      as="select"
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleChange}
                      className="mb-3"
                    >
                      <option value="Bajo">Bajo</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Alto">Alto</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formGoal" className="mb-3">
                    <Form.Label>Objetivo:</Form.Label>
                    <Form.Control
                      as="select"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="mb-3"
                    >
                      <option value="Perdida de grasa">Perdida de grasa</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Ganancia muscular">
                        Ganancia muscular
                      </option>
                    </Form.Control>
                  </Form.Group>
                  <div className="mb-3">
                    <Button type="submit" className="w-100 mb-3">
                      Guardar
                    </Button>
                    <br />
                    <Button
                      onClick={() => setEditPasswordMode(true)}
                      className="w-100 mb-3"
                    >
                      Cambiar contraseña
                    </Button>
                    <Button
                      onClick={() => setEditEmailMode(true)}
                      className="w-100 mb-3"
                    >
                      Cambiar email
                    </Button>
                  </div>
                </Form>
              )}
              {editPasswordMode && (
                <Form onSubmit={handlePasswordChange} className="mb-3">
                  <Form.Group controlId="formCurrentPassword" className="mb-3">
                    <Form.Label>Contraseña actual:</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formNewPassword" className="mb-3">
                    <Form.Label>Nueva contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Repetir contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button type="submit" className="w-100 mb-3">
                    Cambiar contraseña
                  </Button>
                </Form>
              )}
              {editEmailMode && (
                <Form onSubmit={handleEmailChange} className="mb-3">
                  <Form.Group controlId="formNewEmail" className="mb-3">
                    <Form.Label>Nuevo email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="newEmail"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formCurrentPassword" className="mb-3">
                    <Form.Label>Contraseña actual:</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button type="submit" className="w-100 mb-3">
                    Cambiar email
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default Profile;
