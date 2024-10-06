export interface CategoryFormState {
  errors: {
    slug?: string[]
    title?: string[]
    _form?: string
  }
}

export interface TechnologyFormState {
  errors: {
    title?: string[]
    url?: string[]
    _form?: string
  }
}

export interface FormationFormState {
  errors: {
    institution?: string[]
    title?: string[]
    duration_time?: string[]
    certificate_url?: string[]
    _form?: string
  }
}

export interface ProjectFormState {
  errors: {
    title?: string[]
    description?: string[]
    slug?: string[]
    created_at?: string[]
    website_url?: string[]
    presentation_video_url?: string[]
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