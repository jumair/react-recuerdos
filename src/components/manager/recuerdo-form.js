import React, { Component } from "react";
import axios from 'axios';
import { DropzoneComponent } from "react-dropzone-component";
import crypto from "crypto";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import storage from '../utils/storage';
import datosapis from '../utils/apis';

export default class RecuerdoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titulo: "",
            description: "",
            estado_foto: "Aprobada",
            url_foto: "",
            dropzone_image: "",
            fecha_foto: "",
            fecha_foto_subida: "",
            usuario_id: "",
            editMode: false,
            apiUrl: datosapis.urlapi + "foto_nueva",
            apiAction: 'post',
            etiquetas: []
          };

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.componentConfig = this.componentConfig.bind(this);
          this.djsConfig = this.djsConfig.bind(this);
          this.handleImageDrop = this.handleImageDrop.bind(this)

          this.subirImagen = this.subirImagen.bind(this);
          this.subirInformacion = this.subirInformacion.bind(this);

          this.borraFotoDeCloudinary = this.borraFotoDeCloudinary.bind(this);

          this.etiquetaChange = this.etiquetaChange.bind(this);
          this.crearArrayEtiquetas = this.crearArrayEtiquetas.bind(this);
          this.verQuienes = this.verQuienes.bind(this);

          this.imageRef = React.createRef();
    }

    formateaFecha(fecha) {
        const mes = (fecha.getMonth() + 1) > 9 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1);
        const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
        const fechaFormateada = fecha.getFullYear() + "-" + mes + "-" + dia;

        return fechaFormateada
    }

    componentDidUpdate() {
        if (Object.keys(this.props.recuerdoToEdit).length > 0) {
            const {
                id,
                titulo,
                descripcion,
                estado_foto,
                url_foto,
                fecha_foto,
                fecha_foto_subida,
                usuario_id
            } = this.props.recuerdoToEdit;

            this.props.clearRecuerdoToEdit();

            /* Formatear fecha a yyyy-MM-dd */
            const fecha = new Date(fecha_foto)

            this.setState({
                id: id || "",
                titulo: titulo || "",
                descripcion: descripcion || "",
                estado_foto: estado_foto || "Aprobada",
                url_foto: url_foto || "",
                fecha_foto: this.formateaFecha(fecha) || "",
                fecha_foto_subida: fecha_foto_subida || "",
                usuario_id: usuario_id || "",
                editMode: true,
                apiUrl: datosapis.urlapi + "foto_modifica/" + id,
                apiAction: 'put',
            });

            this.verQuienes(id);

        }
    }

    handleImageDrop() {
        return {
            addedfile: file => this.setState({ dropzone_image: file })
        };
    }

    componentConfig() {
        return {
            iconFilestypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        };
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        };
    }

    buildForm() {
        /* Formatear fecha */
        const fecha = new Date();

        let formData = new FormData();

        formData.append("titulo", this.state.titulo);
        formData.append("descripcion", this.state.descripcion);
        formData.append("url_foto", this.state.url_foto);
        formData.append("estado_foto", this.state.estado_foto);
        formData.append("fecha_foto", this.state.fecha_foto);
        formData.append("fecha_foto_subida", this.formateaFecha(fecha));
        formData.append("usuario_id", storage.get('Id'));
        formData.append("etiquetas", JSON.stringify(this.state.etiquetas));

        return formData;
    }

    subirImagen() {
        if (this.state.dropzone_image) {
            const formData = new FormData();
            formData.append("file", this.state.dropzone_image);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", datosapis.cloudinary.uploadPreset);
            formData.append("api_key", datosapis.cloudinary.apiKey);
            formData.append("timestamp", (Date.now() / 1000) | 0);
            
            axios
            .post("https://api.cloudinary.com/v1_1/" + datosapis.cloudinary.uploadPreset + "/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            })
            .then((response) => {;
                this.setState({url_foto: response.data.secure_url});

                this.subirInformacion();
            })
            .catch(error => {
                console.log("error in subirImagen en Form", error);
            });
        } else {
            alert("Debe seleccionar una imagen");
        }
    }

    subirInformacion() {
        axios
          ({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm()
          })
          .then(response => {
            if (this.state.editMode) {
                this.props.handleEditFormSubmission();
            } else {
                this.props.handleNewFormSubmission(response.data);
            }

            this.setState({
                id: "",
                titulo: "",
                descripcion: "",
                estado_foto: "Aprobada",
                url_foto: "",
                dropzone_image: "",
                fecha_foto: "",
                fecha_foto_subida: "",
                usuario_id: "",
                editMode: false,
                apiUrl: datosapis.urlapi + "foto_nueva",
                apiAction: 'post'
            });

            // Borra las imágenes en miniatura de Dropzone.
            this.imageRef.current.dropzone.removeAllFiles();

            //Poner las etiquetas a 0
            this.state.etiquetas.forEach(quienEtiquetado => {
                quienEtiquetado.etiquetado = 0;
            });

            alert("Formulario " + response.data);

          })
          .catch(error => {
            console.log("error in handleSubmit en Form", error);
          });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        if (this.state.editMode) {
            this.subirInformacion();
        } else {
            this.subirImagen();
        }

        event.preventDefault();
    }

    borraFotoDeCloudinary(imageUrlABorrar) {
        const generatePublicId = (imageUrl) => {
            const arrayRes = imageUrl.split("/");
            const carpeta = arrayRes[arrayRes.length - 2];
            const nombreConExtension = arrayRes[arrayRes.length - 1];
            const [nombre] = nombreConExtension.split(".");
            const resultado = carpeta + "/" + nombre;
            return resultado;
        }

        const generateSHA1 = (data) => {
            const hash = crypto.createHash("sha1");
            hash.update(data);
            return hash.digest("hex");
        };
          
        const generateSignature = (publicId, apiSecret) => {
            const timestamp = new Date().getTime();
            return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        };

        const handleDelete = ({ publicId }) => {
            const cloudName = datosapis.cloudinary.cloudName;
            const apiKey = datosapis.cloudinary.apiKey;
            const apiSecret = datosapis.cloudinary.apiSecret;

            const timestamp = new Date().getTime();
            const signature = generateSHA1(generateSignature(publicId, apiSecret));
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
            
            axios
                .post(url, {
                    public_id: publicId,
                    signature: signature,
                    api_key: apiKey,
                    timestamp: timestamp,
                })
                .then((response) => {
                    console.log("Image deleted from cloudinary: ", response);      
                })
                .catch((error) => {
                    console.error("Unable to delete image: ", error)
                });
        };

        const publicId = generatePublicId(imageUrlABorrar);
        handleDelete({publicId});
    }

    etiquetaChange(event) {
        const index = this.state.etiquetas.findIndex(usuario => usuario.nombre === event.target.innerHTML);

        if (event.target.className === "color-activada") {
            event.target.className = "color-desactivada";
            this.state.etiquetas[index].etiquetado = 0;
        } else {
            event.target.className = "color-activada";
            this.state.etiquetas[index].etiquetado = 1;
        }
    }

    crearArrayEtiquetas() {
        const urlApi = datosapis.urlapi + "usuarios";

        axios
            .get(
                urlApi
            )
            .then(response => {
                let resultado = [];
                response.data.forEach(usuario => {
                    const etiUsuario = {"nombre": usuario.nombre, "id": usuario.id, "etiquetado": 0};
                    resultado.push(etiUsuario);
                });
                
                this.setState({
                    etiquetas: resultado
                });
            })
            .catch(error => {
                console.log("crearArrayEtiquetas error", error);
            });  
    }

    verQuienes(id) {
        const urlApi = datosapis.urlapi + "quienes/";

        axios
            .get(
                urlApi + id
            )
            .then(response => {
                //Quita los etiquetados del array primero
                this.state.etiquetas.forEach(quienEtiquetado => {
                    quienEtiquetado.etiquetado = 0;
                });

                response.data.forEach(quien => {
                    const index = this.state.etiquetas.findIndex(usuario => usuario.nombre === quien.nombre);
                    this.state.etiquetas[index].etiquetado = 1;
                });

                const copia = this.state.etiquetas;
                let resultado = [];
                copia.forEach(usuario => {
                    const etiUsuario = {"nombre": usuario.nombre, "id": usuario.id, "etiquetado": usuario.etiquetado};
                    resultado.push(etiUsuario);
                });
                
                this.setState({
                    etiquetas: resultado
                });
            })
            .catch(error => {
                console.log("verQuienes error", error);
            });
    }

    componentDidMount() {
        this.crearArrayEtiquetas();
    }

    render() {
        const mostrarEtiquetados = this.state.etiquetas.map(usuario => {
            const activada = usuario.etiquetado === 1 ? "color-activada" : "color-desactivada";
            return (<label key={usuario.id} className={activada} id={usuario.id} onClick={this.etiquetaChange}>{usuario.nombre}</label>)
        });

        return(
            <div>
                <form onSubmit={this.handleSubmit} className="recuerdo-form-contenedor">
                    <legend>Recuerdo</legend>

                    <div className="two-column">
                        <label>Id</label>
                        <label>Titulo</label>
                    </div>

                    <div className="two-column">
                        <label>{this.state.id}</label>

                        <input
                            type="text"
                            name="titulo"
                            placeholder="* Titulo"
                            autoFocus={true}
                            value={this.state.titulo}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="one-column">
                        <label>Descripcion</label>
                    </div>

                    <div className="one-column">
                        <textarea
                            type="text"
                            name="descripcion"
                            placeholder="* Descripción"
                            value={this.state.descripcion}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="three-column">
                        <label>Fecha de la Foto</label>
                    </div>

                    <div className="three-column">
                        <input
                            type="date"
                            name="fecha_foto"
                            placeholder="* Fecha de la Foto"
                            value={this.state.fecha_foto}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="two-column">
                        <div className="image-uploader">
                            {this.state.url_foto && this.state.editMode ? (
                                <div className="portfolio-manager-image-wrapper">
                                    <img src={this.state.url_foto} />
                                </div>
                            ) : (
                                <DropzoneComponent
                                    ref={this.imageRef}   

                                    config={this.componentConfig()}
                                    djsConfig={this.djsConfig()}
                                    eventHandlers={this.handleImageDrop()}
                                >
                                    <div className="dz-message">Coloca tu imágen aquí O haz click para seleccionar</div>
                                </DropzoneComponent>
                            )}
                        </div>

                        <div className="usuarios-etiquetas">
                            <label>Usuarios Etiquetados</label>
                            <hr></hr>
                            <br></br>

                            <div className="three-column">
                                {mostrarEtiquetados}
                            </div>
                        </div>   
                    </div>

                    <br></br>
                    <br></br>
                    
                    <div>
                        <button className="btn" type="submit">Guardar</button>
                    </div>
                </form>
                
            </div>
        );
    }
}