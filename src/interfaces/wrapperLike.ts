import {
  DefinedComponent,
  FindAllComponentsSelector,
  FindComponentSelector,
  NameSelector,
  RefSelector
} from 'src/types'
import { VueWrapper } from 'src/vueWrapper'
import { ComponentPublicInstance, FunctionalComponent } from 'vue'
import type { DOMWrapper } from '../domWrapper'

export default interface WrapperLike {
  readonly element: Node
  find<K extends keyof HTMLElementTagNameMap>(
    selector: K
  ): DOMWrapper<HTMLElementTagNameMap[K]>
  find<K extends keyof SVGElementTagNameMap>(
    selector: K
  ): DOMWrapper<SVGElementTagNameMap[K]>
  find<T extends Element = Element>(selector: string): DOMWrapper<T>
  find<T extends Node = Node>(selector: string | RefSelector): DOMWrapper<T>

  findAll<K extends keyof HTMLElementTagNameMap>(
    selector: K
  ): DOMWrapper<HTMLElementTagNameMap[K]>[]
  findAll<K extends keyof SVGElementTagNameMap>(
    selector: K
  ): DOMWrapper<SVGElementTagNameMap[K]>[]

  findAll<T extends Element>(selector: string): DOMWrapper<T>[]
  findAll(selector: string): DOMWrapper<Element>[]

  findComponent<T extends never>(selector: string): WrapperLike
  findComponent<T extends DefinedComponent>(
    selector: T | Exclude<FindComponentSelector, FunctionalComponent>
  ): VueWrapper<InstanceType<T>>
  findComponent<T extends FunctionalComponent>(
    selector: T | string
  ): DOMWrapper<Element>
  findComponent<T extends never>(
    selector: NameSelector | RefSelector
  ): VueWrapper
  findComponent<T extends ComponentPublicInstance>(
    selector: T | FindComponentSelector
  ): VueWrapper<T>
  findComponent(selector: FindComponentSelector): WrapperLike

  findAllComponents<T extends never>(selector: string): WrapperLike[]
  findAllComponents<T extends DefinedComponent>(
    selector: T | Exclude<FindAllComponentsSelector, FunctionalComponent>
  ): VueWrapper<InstanceType<T>>[]
  findAllComponents<T extends FunctionalComponent>(
    selector: string
  ): DOMWrapper<Element>[]
  findAllComponents<T extends FunctionalComponent>(
    selector: T
  ): DOMWrapper<Node>[]
  findAllComponents<T extends never>(selector: NameSelector): VueWrapper[]
  findAllComponents<T extends ComponentPublicInstance>(
    selector: T | FindAllComponentsSelector
  ): VueWrapper<T>[]
  findAllComponents(selector: FindAllComponentsSelector): WrapperLike[]

  get<K extends keyof HTMLElementTagNameMap>(
    selector: K
  ): Omit<DOMWrapper<HTMLElementTagNameMap[K]>, 'exists'>
  get<K extends keyof SVGElementTagNameMap>(
    selector: K
  ): Omit<DOMWrapper<SVGElementTagNameMap[K]>, 'exists'>
  get<T extends Element = Element>(
    selector: string
  ): Omit<DOMWrapper<T>, 'exists'>
  get<T extends Node = Node>(
    selector: string | RefSelector
  ): Omit<DOMWrapper<T>, 'exists'>

  getComponent<T extends never>(selector: string): Omit<WrapperLike, 'exists'>
  getComponent<T extends DefinedComponent>(
    selector: T | Exclude<FindComponentSelector, FunctionalComponent>
  ): Omit<VueWrapper<InstanceType<T>>, 'exists'>
  // searching for functional component results in DOMWrapper
  getComponent<T extends FunctionalComponent>(
    selector: T | string
  ): Omit<DOMWrapper<Element>, 'exists'>
  getComponent<T extends ComponentPublicInstance>(
    selector: T | FindComponentSelector
  ): Omit<VueWrapper<T>, 'exists'>
  // catch all declaration
  getComponent<T extends never>(
    selector: FindComponentSelector
  ): Omit<WrapperLike, 'exists'>

  html(): string

  attributes(): { [key: string]: string }
  attributes(key: string): string
  attributes(key?: string): { [key: string]: string } | string

  exists(): boolean

  setValue(value: any): Promise<void>
}
