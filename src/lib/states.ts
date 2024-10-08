export interface LoginFormState {
  errors: {
    user?: string[]
    password?: string[]
    _form?: string
  }
}

export interface CategoryFormState {
  success?: boolean
  errors: {
    title?: string[]
    _form?: string
  }
}

export interface TechnologyFormState {
  success?: boolean
  errors: {
    title?: string[]
    url?: string[]
    _form?: string
  }
}

export interface FormationFormState {
  success?: boolean
  errors: {
    institution?: string[]
    title?: string[]
    duration_time?: string[]
    certificate_url?: string[]
    category?: string[]
    _form?: string
  }
}

export interface ProjectFormState {
  success?: boolean
  errors: {
    title?: string[]
    description?: string[]
    created_at?: string[]
    website_url?: string[]
    repository?: string[]
    presentation_video_url?: string[]
    technologies?: string[]
    _form?: string
  }
}

export interface FormationCategoriesFormState {
  errors: {
    formation_id?: string[]
    category_id?: string[]
    _form?: string
  }
}

export interface ProjectTechnologiesFormState {
  errors: {
    project_id?: string[]
    technology_id?: string[]
    _form?: string
  }
}
