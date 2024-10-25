import type { Schema, Attribute } from '@strapi/strapi';

export interface FormDefault extends Schema.Component {
  collectionName: 'components_form_defaults';
  info: {
    displayName: 'Form_Ratio';
    description: '';
  };
  attributes: {
    Topic_Assessment: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    Ratio: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 2;
          max: 5;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    Description: Attribute.Blocks & Attribute.Required;
    Descript_Choice: Attribute.Text & Attribute.Required;
    category_skillsets: Attribute.Relation<
      'form.default',
      'oneToMany',
      'api::category-skillset.category-skillset'
    > &
      Attribute.Required;
  };
}

export interface RegisterEmployee extends Schema.Component {
  collectionName: 'components_register_employees';
  info: {
    displayName: 'Employee';
    description: '';
  };
  attributes: {
    EN_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    EN_Nickname: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    TH_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    TH_Nickname: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    Citizen: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 13;
      }>;
    Birthday: Attribute.Date & Attribute.Required;
    ID_Line: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    Telephone: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    Bank: Attribute.Enumeration<
      [
        'Promtpay - \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E1E\u0E22\u0E4C',
        'KBANK - \u0E01\u0E2A\u0E34\u0E01\u0E32\u0E23',
        'SCB - \u0E44\u0E17\u0E22\u0E1E\u0E32\u0E13\u0E34\u0E0A\u0E22\u0E4C',
        'BAY - \u0E01\u0E23\u0E38\u0E07\u0E28\u0E23\u0E35\u0E2D\u0E22\u0E38\u0E18\u0E22\u0E32',
        'UOB - \u0E22\u0E39\u0E42\u0E2D\u0E1A\u0E35'
      ]
    > &
      Attribute.Required;
    ID_Bank: Attribute.String & Attribute.Required;
  };
}

export interface RegisterStudent extends Schema.Component {
  collectionName: 'components_register_student_s';
  info: {
    displayName: 'Student ';
    description: '';
  };
  attributes: {
    EN_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    EN_Nickname: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    TH_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    TH_Nickname: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    Citizen: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 13;
      }>;
    Birthday: Attribute.Date & Attribute.Required;
    School: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    Telephone: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'form.default': FormDefault;
      'register.employee': RegisterEmployee;
      'register.student': RegisterStudent;
    }
  }
}
