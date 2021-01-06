import React, { ChangeEvent, ReactElement, useState, useEffect, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../hooks/useDebounce'
import useClickOutSide from '../hooks/useClickOutside'
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [suggestion, setSuggestion] = useState<DataSourceType[]>([])
  const [highlightIndex, setHighlightIndex] = useState(0)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const deBouncedValue = useDebounce(inputValue, 500)
  useClickOutSide(componentRef, () => { setSuggestion([]) })
  useEffect(() => {
    if (deBouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(deBouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestion(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestion(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(true)
    }
    setHighlightIndex(-1)
  }, [deBouncedValue, fetchSuggestions])
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestion.length) {
      index = suggestion.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestion[highlightIndex]) {
          handleSelect(suggestion[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item
  }
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => { setSuggestion([]) }}
      >
        <ul className="viking-suggestion-list">
          {loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          }
          {suggestion.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}
export default AutoComplete