export const FIXTURE_MODIFIER_AUTOCOMPLETE = {
  id: 1,
  name: 'customer',
  type: 'autocomplete',
  resource_name: 'customers',
  label: 'Customer name / ID',
  placeholder: 'Customer name / ID',
  filter: 'filter[name]',
  value_param: 'uuid',
  text_param: 'name'
}

export const FIXTURE_MODIFIER_SELECT = {
  id: 2,
  name: 'status',
  type: 'select',
  resource_name: 'deal-statuses',
  label: 'Status & appts',
  placeholder: 'Status & appts'
}

export const FIXTURE_MODIFIER_DATE = {
  id: 3,
  name: 'date_after',
  type: 'date',
  resource_name: 'date_after',
  label: 'Min date',
  placeholder: 'Min date'
}

export const FIXTURE_MODIFIER_TEXT = {
  id: 4,
  name: 'min_price',
  resource_name: null,
  label: 'Min price',
  placeholder: 'Min price',
  type: 'text'
}
