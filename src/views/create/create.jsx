import React, { useEffect, useState } from "react";
import style from "./create.module.css";
import { Link } from "react-router-dom";
import { postDog, getTemperaments } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

function Create() {
  const dispatch = useDispatch();

  // Formulario
  const [form, setForm] = useState({
    name: "",
    image: "",
    weight: "1 - 2",
    height: "1 - 2",
    life_span: "",
    temperament: []
  });

  // Temperamentos
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  // Errores
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    weightmin: "",
    weightmax: "",
    heightmin: "",
    heightmax: "",
    life_span: "",
    temperament: ""
  });

  // Manejador de cambio de input
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm((prevForm) => ({
      ...prevForm,
      [property]: value
    }));
  };

  // Manejador de cambio de input para el campo de temperamentos
  const toggleTemperament = (temperament) => {
    if (form.temperament.includes(temperament)) {
      // Si el temperamento ya está seleccionado, quítalo
      setForm((prevForm) => ({
        ...prevForm,
        temperament: prevForm.temperament.filter((t) => t !== temperament)
      }));
    } else {
      // Si el temperamento no está seleccionado, agrégalo
      setForm((prevForm) => ({
        ...prevForm,
        temperament: [...prevForm.temperament, temperament]
      }));
    }
  };

  // Validar el formulario y establecer errores
  useEffect(() => {
    validate(form);
  }, [form]);

  // Validar el formulario y establecer errores
  const validate = (form) => {
    let errors = {};

    const namePattern = /^[A-Za-z\s]+$/;
    if (form.name.length >= 5 && form.name.length <= 35 && namePattern.test(form.name)) {
        errors.name = "";
    } else {
        errors.name = "Debe contener de 5 a 35 caracteres y solo letras";
    }
    if (isValidUrl(form.image)) {
      errors.image = "";
    } else {
      errors.image = "Debes introducir una URL válida";
    }



    if (form.weight !== "" && form.weight.split(" - ")[0] > 0 && form.weight.split(" - ")[0] < 99 &&  !isNaN(form.weight.split(" - ")[0])) {
      errors.weightmin = "";
    } else {
      errors.weightmin = "Debe ser un valor numérico, mayor a 0 y menor al maximo";
    }
    if (form.weight !== "" && form.weight.split(" - ")[1] > 1 && form.weight.split(" - ")[1] <= 99 && form.weight.split(" - ")[1] > form.weight.split(" - ")[0] && !isNaN(form.weight.split(" - ")[1])) {
      errors.weightmax = "";
    } else {
      errors.weightmax = " weight max debe ser un valor numérico, mayor al minimo y menor que 99";
    }

    if (form.height !== "" && form.height.split(" - ")[0] > 0 && form.height.split(" - ")[0] < 99 && !isNaN(form.height.split(" - ")[0])) {
      errors.heightmin = "";
    } else {
      errors.heightmin = "Debe ser un valor numérico, mayor a 0 y menor al maximo";
    }
    if (form.height !== "" && form.height.split(" - ")[1] > 1 && form.height.split(" - ")[1] <= 99 && form.height.split(" - ")[1] > form.height.split(" - ")[0] && !isNaN(form.height.split(" - ")[1])) {
      errors.heightmax = "";
    } else {
      errors.heightmax = " height max debe ser un valor numérico, mayor al minimo y menor que 99";
    }


    // if (form.height !== "" && !isNaN(form.height)) {
    //   errors.height = "";
    // } else {
    //   errors.height = "Debe ser un valor numérico";
    // }

    if (form.life_span > 0 && form.life_span <= 30) {
      errors.life_span = "";
    } else {
      errors.life_span = "Debe ser un valor entre 1 y 30";
    }

    if (form.temperament.length > 0) {
      errors.temperament = "";
    } else {
      errors.temperament = "Debes seleccionar al menos un temperamento";
    }

    setErrors(errors);
  };

  // Validar URL
  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    return urlPattern.test(url);
  };

  // Comprobar si hay errores en el formulario
  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  // Comprobar si el formulario está completo
  const isFormComplete = () => {
    return (
      form.name !== "" &&
      form.image !== "" &&
      form.weight !== "" &&
      form.height !== "" &&
      form.life_span !== "" &&
      form.temperament.length > 0
    );
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    validate(form);

    // Comprobar si hay errores
    if (hasErrors()) {
      alert("El formulario contiene errores. Por favor, revíselo.");
      return; // No enviar el formulario si hay errores
    }

    // Comprobar si el formulario está completo
    if (!isFormComplete()) {
      alert("Por favor, complete todos los campos del formulario.");
      return; // No enviar el formulario si no está completo
    }

    dispatch(postDog(form));
    alert("¡Perro creado!");
    resetForm();
  };

  // Reiniciar el formulario
  const resetForm = () => {
    setForm({
      name: "",
      image: "",
      weight: "",
      height: "",
      life_span: "",
      temperament: []
    });
  };

    // Manejador de cambio de input para los campos de peso mínimo y máximo
    const handleWeightChange = (event) => {
        const minWeight = parseFloat(form.weight.split(" - ")[0]);
        const maxWeight = parseFloat(form.weight.split(" - ")[1]);
        const property = event.target.name;
        const value = event.target.value;
    
        if (property === "minWeight") {
          setForm((prevForm) => ({
            ...prevForm,
            weight: `${value} - ${maxWeight}`
          }));
        } else if (property === "maxWeight") {
          setForm((prevForm) => ({
            ...prevForm,
            weight: `${minWeight} - ${value}`
          }));
        }
      };
      
      const handleHeightChange = (event) => {
          const minHeight = parseFloat(form.height.split(" - ")[0]);
          const maxHeight = parseFloat(form.height.split(" - ")[1]);
          const property = event.target.name;
          const value = event.target.value;
      
          if (property === "minHeight") {
            setForm((prevForm) => ({
              ...prevForm,
              height: `${value} - ${maxHeight}`
            }));
          } else if (property === "maxHeight") {
            setForm((prevForm) => ({
              ...prevForm,
              height: `${minHeight} - ${value}`
            }));
          }
        };

  console.log(form)
  console.log(errors)
  
  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <Link to="/home">
          <img
            className={style.logo}
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="PI Dogs"
          />
        </Link>
        <div className={style.info}>
          <h2>Create your own dog!</h2>
          <div>
            <label>name: </label>
            <input
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            <span className={style.error}>{errors.name}</span>
          </div>
          <div>
            <label>image: </label>
            <input
              type="text"
              value={form.image}
              placeholder="url image..."
              onChange={changeHandler}
              name="image"
            />
            <span className={style.error}>{errors.image}</span>
          </div>

          <div className={style.measure}>
            <label>weight min: </label>
            <input
              value={form.weight.split(" - ")[0]}
              type="number"
              min={1}
              max={99}
              onChange={handleWeightChange}
              name="minWeight"
            />
            

            <label>max: </label>
            <input
              type="number"
              min={1}
              max={99}
              value={form.weight.split(" - ")[1] || 1 }
              placeholder="4"
              onChange={handleWeightChange}
              name="maxWeight"
            />
            <div className={style.errorweight}>
            <span className={style.error}>{errors.weightmin}</span>
            <span className={style.error}>{errors.weightmax}</span>
            </div>
          </div>

          <div className={style.measure}>
            <label>height min: </label>
            <input
              value={form.height.split(" - ")[0]}
              type="number"
              min={1}
              max={99}
              onChange={handleHeightChange}
              name="minHeight"
            />
            

            <label>max: </label>
            <input
              type="number"
              min={1}
              max={99}
              value={form.height.split(" - ")[1] || 1 }
              placeholder="4"
              onChange={handleHeightChange}
              name="maxHeight"
            />
            <div className={style.errorweight}>
            <span className={style.error}>{errors.heightmin}</span>
            <span className={style.error}>{errors.heightmax}</span>
            </div>
          </div>

          <div>
            <label>life span: </label>
            <input
              type="number"
              min={1}
              max={30}
              value={form.life_span || 1}
              onChange={changeHandler}
              name="life_span"
            />
            <span className={style.error}>{errors.life_span}</span>
          </div>
          <div>
            <label>temperaments: </label>
            <div>
            <ul className={style.checkboxList}>
  {allTemperaments.map((temperament) => temperament !== null && (
    <li key={temperament}>
      <label className={style.checkbox}>
        <input
          type="checkbox"
          checked={form.temperament.includes(temperament)}
          onChange={() => toggleTemperament(temperament)}
        />
        {temperament}
      </label>
    </li>
  ))}
</ul>
            </div>
            <span className={style.error}>{errors.temperament}</span>
          </div>
        </div>
        <button className={style.button} type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Create;