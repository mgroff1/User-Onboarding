import React, {
    useState,
    useEffect
  } from "react";
  import {
    withFormik,
    Form,
    Field
  } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  // removed
  // state
  // onSubmit
  // onChange
  
  const AnimalForm = ({
    values,
    errors,
    touched,
    status
  }) => {
    const [animals, setAnimals] = useState([]);
    useEffect(() => {
      console.log(
        "status has changed",
        status
      );
      status &&
        setAnimals(animals => [
          ...animals,
          status
        ]);
    }, [status]);
    return (
      <div className="animal-form">
        <Form>
          <label htmlFor="species">
            Species:
          </label>
          <Field
            id="species"
            type="text"
            name="species"
          />
          {touched.species &&
            errors.species && (
              <p className="errors">
                {errors.species}
              </p>
            )}
          <label htmlFor="size">Size</label>
          <Field
            id="size"
            type="text"
            name="size"
          />
          {touched.size && errors.size && (
            <p className="errors">
              {errors.size}
            </p>
          )}
          <Field
            className="food-select"
            as="select"
            name="diet"
          >
            <option disabled>
              Choose an option
            </option>
            <option value="herbivore">
              Herbivore
            </option>
            <option value="carnivore">
              Carnivore
            </option>
            <option value="omnivore">
              Omnivore
            </option>
          </Field>
          <label
            htmlFor="vaccinations"
            className="checkbox-container"
          >
            Vaccinations
            <Field
              id="vaccinations"
              type="checkbox"
              name="vaccinations"
              checked={values.vaccinations}
            />
            <span className="checkmark" />
          </label>
          <Field
            as="textarea"
            type="text"
            name="notes"
            placeholder="Notes"
          />
          <button type="submit">
            Submit!
          </button>
        </Form>
        {animals.map(animal => (
          <ul key={animal.id}>
            <li>Species: {animal.species}</li>
            <li>Size: {animal.size}</li>
            <li>Food: {animal.diet}</li>
          </ul>
        ))}
      </div>
    );
  };
  
  const FormikAnimalForm = withFormik({
    mapPropsToValues({
      species,
      size,
      vaccinations
    }) {
      return {
        species: species || "",
        size: "",
        vaccinations: vaccinations || false,
        notes: ""
      };
    },
    validationSchema: Yup.object().shape({
      species: Yup.string().required(
        "This is a new error"
      ),
      size: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
      console.log("submitting", values);
      axios
        .post(
          "https://reqres.in/api/users/",
          values
        )
        .then(res => {
          console.log("success", res);
          setStatus(res.data);
        })
        .catch(err =>
          console.log(err.response)
        );
    }
  })(AnimalForm);
  // replaced AnimalForm with FormikAnimalForm
  export default FormikAnimalForm;
  