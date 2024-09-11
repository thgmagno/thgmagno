'use client'

import { kv } from '@vercel/kv'
import * as jose from 'jose'
import React, { ChangeEvent, useState } from 'react'
import {
  MultiLangContent,
  Feature,
  Technology,
  ImageUrl,
  FormData,
} from '@/lib/types'
import useProjectStore from '@/lib/store/projectStore'
import { ValidateProjectForm } from './ValidateProjectForm'
import { getSecret } from '@/actions'

export function AddProjectForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<[boolean, string]>([false, ''])

  const {
    addFeature,
    addTechnology,
    formData,
    removeFeature,
    removeTechnology,
    setFormData,
  } = useProjectStore()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    lang: keyof MultiLangContent | null,
    section: keyof FormData,
    index?: number,
    field?: keyof Feature | keyof Technology | keyof ImageUrl,
  ) => {
    const value = e.target.value
    if (section === 'features' || section === 'technologies') {
      if (lang && index !== undefined && field) {
        const updatedSection = formData[section][lang].map((item, i) =>
          i === index ? { ...item, [field]: value } : item,
        )
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [lang]: updatedSection,
          },
        })
      }
    } else if (lang) {
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section] as MultiLangContent),
          [lang]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [section]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidForm = ValidateProjectForm(formData)

    if (!isValidForm) {
      return setError([true, 'Preencha todos os campos'])
    }

    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const secret = new TextEncoder().encode(await getSecret())

    try {
      const decoded = await jose.jwtVerify(formData.token, secret)
      // Se chegar aqui, o token é válido
    } catch (err) {
      setError([true, 'Token inválido'])
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-5 mx-auto mb-40 flex w-[96%] max-w-5xl flex-col space-y-5 rounded-lg bg-slate-400/80 px-2 py-8 dark:bg-neutral-900"
    >
      <h1 className="cursor-default text-center text-lg font-medium tracking-wide text-neutral-800 underline dark:text-neutral-300">
        Add New Project
      </h1>

      {/* Title */}
      <div className="container-horizontal highlight">
        <div className="container-vertical">
          <label>Title (Portuguese):</label>
          <input
            type="text"
            value={formData.title.portuguese}
            onChange={(e) => handleChange(e, 'portuguese', 'title')}
          />
        </div>
        <div className="container-vertical">
          <label>Title (English):</label>
          <input
            type="text"
            value={formData.title.english}
            onChange={(e) => handleChange(e, 'english', 'title')}
          />
        </div>
      </div>

      {/* Slug */}
      <div className="container-vertical highlight">
        <label>Slug:</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => handleChange(e, null, 'slug')}
        />
      </div>

      {/* Description */}
      <div className="container-horizontal highlight">
        <div className="container-vertical">
          <label>Description (Portuguese):</label>
          <textarea
            value={formData.description.portuguese}
            onChange={(e) => handleChange(e, 'portuguese', 'description')}
          />
        </div>
        <div className="container-vertical">
          <label>Description (English):</label>
          <textarea
            value={formData.description.english}
            onChange={(e) => handleChange(e, 'english', 'description')}
          />
        </div>
      </div>

      {/* Objective */}
      <div className="container-horizontal highlight">
        <div className="container-vertical">
          <label>Objective (Portuguese):</label>
          <textarea
            value={formData.objective.portuguese}
            onChange={(e) => handleChange(e, 'portuguese', 'objective')}
          />
        </div>
        <div className="container-vertical">
          <label>Objective (English):</label>
          <textarea
            value={formData.objective.english}
            onChange={(e) => handleChange(e, 'english', 'objective')}
          />
        </div>
      </div>

      {/* Deploy URL */}
      <div className="container-vertical highlight">
        <label>Deploy URL:</label>
        <input
          type="text"
          value={formData.deployUrl}
          onChange={(e) => handleChange(e, null, 'deployUrl')}
        />
      </div>

      {/* Video URL */}
      <div className="container-vertical highlight">
        <label>Video URL (Portuguese):</label>
        <input
          type="text"
          value={formData.videoUrl.portuguese}
          onChange={(e) => handleChange(e, 'portuguese', 'videoUrl')}
        />
        <label>Video URL (English):</label>
        <input
          type="text"
          value={formData.videoUrl.english}
          onChange={(e) => handleChange(e, 'english', 'videoUrl')}
        />
      </div>

      {/* Features */}
      <div className="container-horizontal highlight">
        <div className="container-vertical">
          <h4>Features (Portuguese)</h4>
          {formData.features.portuguese.map((feature, index) => (
            <div key={index} className="container-vertical">
              <label>Title:</label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) =>
                  handleChange(e, 'portuguese', 'features', index, 'title')
                }
              />
              <label>Description:</label>
              <textarea
                value={feature.description}
                onChange={(e) =>
                  handleChange(
                    e,
                    'portuguese',
                    'features',
                    index,
                    'description',
                  )
                }
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeFeature('portuguese', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addFeature('portuguese')}
          >
            Add Feature
          </button>
        </div>

        <div className="container-vertical">
          <h4>Features (English)</h4>
          {formData.features.english.map((feature, index) => (
            <div key={index} className="container-vertical">
              <label>Title:</label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) =>
                  handleChange(e, 'english', 'features', index, 'title')
                }
              />
              <label>Description:</label>
              <textarea
                value={feature.description}
                onChange={(e) =>
                  handleChange(e, 'english', 'features', index, 'description')
                }
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeFeature('english', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addFeature('english')}
          >
            Add Feature
          </button>
        </div>
      </div>

      {/* Technologies */}
      <div className="container-horizontal highlight">
        <div className="container-vertical">
          <h4>Technologies (Portuguese)</h4>
          {formData.technologies.portuguese.map((tech, index) => (
            <div key={index} className="container-vertical">
              <label>Title:</label>
              <input
                type="text"
                value={tech.title}
                onChange={(e) =>
                  handleChange(e, 'portuguese', 'technologies', index, 'title')
                }
              />
              <label>URL:</label>
              <input
                type="text"
                value={tech.url}
                onChange={(e) =>
                  handleChange(e, 'portuguese', 'technologies', index, 'url')
                }
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeTechnology('portuguese', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addTechnology('portuguese')}
          >
            Add Technology
          </button>
        </div>

        <div className="container-vertical">
          <h4>Technologies (English)</h4>
          {formData.technologies.english.map((tech, index) => (
            <div key={index} className="container-vertical">
              <label>Title:</label>
              <input
                type="text"
                value={tech.title}
                onChange={(e) =>
                  handleChange(e, 'english', 'technologies', index, 'title')
                }
              />
              <label>URL:</label>
              <input
                type="text"
                value={tech.url}
                onChange={(e) =>
                  handleChange(e, 'english', 'technologies', index, 'url')
                }
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeTechnology('english', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addTechnology('english')}
          >
            Add Technology
          </button>
        </div>
      </div>

      {/* Image URL */}
      <div className="container-vertical highlight">
        <label>Small Image URL:</label>
        <input
          type="text"
          value={formData.imageUrl.small}
          onChange={(e) =>
            handleChange(e, null, 'imageUrl', undefined, 'small')
          }
        />
        <label>Medium Image URL:</label>
        <input
          type="text"
          value={formData.imageUrl.medium}
          onChange={(e) =>
            handleChange(e, null, 'imageUrl', undefined, 'medium')
          }
        />
      </div>

      {/* Created At | Finished | Featured */}
      <div className="container-horizontal highlight flex-wrap">
        <label className="min-w-fit">Created At:</label>
        <input
          type="date"
          value={formData.createdAt}
          onChange={(e) => handleChange(e, null, 'createdAt')}
        />
        <label>Done:</label>
        <input
          type="checkbox"
          checked={formData.done}
          onChange={(e) => setFormData({ ...formData, done: e.target.checked })}
        />
        <label>Featured:</label>
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
        />
      </div>

      {/* Token */}
      <div className="container-vertical highlight">
        <label>Token:</label>
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, token: e.target.value })}
        />
      </div>

      {error[0] && (
        <span className="my-2 text-center text-sm font-medium text-red-600">
          {error[1]}
        </span>
      )}

      <button
        disabled={loading}
        type="submit"
        className="transition-colors duration-300 active:opacity-80 disabled:animate-pulse disabled:cursor-not-allowed"
      >
        {loading ? 'Loading' : 'Submit'}
      </button>
    </form>
  )
}
