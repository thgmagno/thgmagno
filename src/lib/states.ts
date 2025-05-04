export interface LocationFormState {
  errors: {
    id?: string[]
    title?: string[]
    _form?: string
  }
}

export interface CategoryFormState {
  errors: {
    id?: string[]
    title?: string[]
    active?: string[]
    slug?: string[]
    _form?: string
  }
}

export interface CategoryProjectFormState {
  errors: {
    value?: string[]
    label?: string[]
    _form?: string
  }
}

export interface FormationFormState {
  errors: {
    id?: string[]
    title?: string[]
    startedAt?: string[]
    endedAt?: string[]
    certificateUrl?: string[]
    active?: string[]
    institutionId?: string[]
    categoryId?: string[]
    _form?: string
  }
}

export interface InstitutionFormState {
  errors: {
    id?: string[]
    name?: string[]
    modality?: string[]
    locationId?: string[]
    _form?: string
  }
}

export interface ReactionFormState {
  errors: {
    projectId?: string[]
    emoji?: string[]
    _form?: string
  }
}

export interface CommentFormState {
  success?: boolean
  errors: {
    projectId?: string[]
    commentId?: string[]
    comment?: string[]
    comentParentId?: string[]
    _form?: string
  }
}

export interface FlushAllFormState {
  status?: 'sucesso' | 'erro'
  message?: string
}
