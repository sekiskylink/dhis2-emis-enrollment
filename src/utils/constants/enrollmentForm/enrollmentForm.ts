import { format } from "date-fns";
import { VariablesTypes } from "../../../types/variables/AttributeColumns";
import { FormSectionProps } from "../../../types/form/FormSectionProps";

const staticForm = () => {
  return {
    registeringSchool: {
      required: true,
      name: "registerschoolstaticform",
      labelName: "Registering School",
      valueType: "TEXT",
      options: undefined,
      disabled: true,
      pattern: "",
      visible: true,
      description: "Registering School",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "registerschoolstaticform",
      displayName: "Registering School",
      header: "Registering School",
      type: VariablesTypes.DataElement,
      assignedValue: undefined
    },
    enrollmentDate: {
      required: true,
      name: "eventdatestaticform",
      labelName: "Enrollment date",
      valueType: "DATE",
      options: undefined,
      disabled: false,
      pattern: "",
      visible: true,
      description: "Enrollment date",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "eventdatestaticform",
      displayName: "Enrollment date",
      header: "Enrollment date",
      type: VariablesTypes.DataElement,
      assignedValue: format(new Date(), "yyyy-MM-dd")
    }
  }
}

function formFields(enrollmentsData: any[], sectionName: string): FormSectionProps[] {
  const [enrollmentDetails, studentsProfile, socioEconomicDetails] = enrollmentsData;
  return [
    {
      section: "Enrollment Details",
      description: "Details related to the enrollment process",
      fields: [
        staticForm().registeringSchool,
        ...enrollmentDetails,
        staticForm().enrollmentDate
      ]
    },
    {
      section: `${sectionName} profile`,
      description: `${sectionName} personal details`,
      fields: [
        ...studentsProfile
      ]
    },
    {
      section: "Socio-economic details",
      description: `Details about the ${sectionName} socio-economic status`,
      fields: [
        ...socioEconomicDetails
      ]
    }
  ];
}

export { formFields, staticForm };
