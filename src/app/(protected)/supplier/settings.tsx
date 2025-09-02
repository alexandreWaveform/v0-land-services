"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

interface EquipmentItem {
  id: string
  name: string
  brand: string
  icon: keyof typeof Ionicons.glyphMap
}

interface ConsumableItem {
  id: string
  name: string
  quantity: string
  icon: keyof typeof Ionicons.glyphMap
}

interface CollaboratorItem {
  id: string
  name: string
  role: string
  icon: keyof typeof Ionicons.glyphMap
}

interface ServiceItem {
  id: string
  name: string
  status: string
  icon: keyof typeof Ionicons.glyphMap
}

interface EquipmentFormData {
  nome: string
  marca: string
  modelo: string
  numeroSerie: string
  potencia: string
  dataCompra: string
  valorAquisicao: string
  unidade: string
  custoPorUnidade: string
  observacoes: string
}

interface ConsumableFormData {
  nome: string
  marca: string
  referencia: string
  dataCompra: string
  valorAquisicao: string
  unidade: string
  custoPorUnidade: string
  observacoes: string
}

interface CollaboratorFormData {
  nome: string
  funcao: string
  dataNascimento: string
  unidade: string
  custoPorUnidade: string
  observacoes: string
}

interface ServiceFormData {
  nome: string
  descricaoCurta: string
  descricaoLonga: string
  observacoes: string
  equipamentos: string[]
  consumiveis: string[]
  colaboradores: { id: string; name: string; enabled: boolean }[]
}

interface ValidationErrors {
  [key: string]: string
}

// First, let's add new interfaces to track the additional checkbox states
interface SelectionItemState {
  id: string
  selected: boolean
  option1: boolean
  option2: boolean
}

const equipmentData: EquipmentItem[] = [
  {
    id: "1",
    name: "Tractor John Deere",
    brand: "John Deere",
    icon: "car-outline",
  },
  {
    id: "2",
    name: "Alfafa Cortador",
    brand: "Case IH",
    icon: "leaf-outline",
  },
  {
    id: "3",
    name: "Pulverizador",
    brand: "Amazone",
    icon: "water-outline",
  },
  {
    id: "4",
    name: "Arado",
    brand: "Lemken",
    icon: "construct-outline",
  },
  {
    id: "5",
    name: "Semeadora",
    brand: "Kuhn",
    icon: "ellipse-outline",
  },
  {
    id: "6",
    name: "Ceifeira",
    brand: "New Holland",
    icon: "cut-outline",
  },
  {
    id: "7",
    name: "Reboque",
    brand: "Fliegl",
    icon: "bus-outline",
  },
  {
    id: "8",
    name: "Cultivador",
    brand: "Väderstad",
    icon: "grid-outline",
  },
]

const consumablesData: ConsumableItem[] = [
  {
    id: "1",
    name: "Fertilizante NPK",
    quantity: "50kg",
    icon: "flask-outline",
  },
  {
    id: "2",
    name: "Sementes Milho",
    quantity: "25kg",
    icon: "nutrition-outline",
  },
  {
    id: "3",
    name: "Herbicida",
    quantity: "10L",
    icon: "beaker-outline",
  },
  {
    id: "4",
    name: "Inseticida",
    quantity: "5L",
    icon: "bug-outline",
  },
  {
    id: "5",
    name: "Sementes Trigo",
    quantity: "40kg",
    icon: "leaf-outline",
  },
  {
    id: "6",
    name: "Calcário",
    quantity: "100kg",
    icon: "diamond-outline",
  },
  {
    id: "7",
    name: "Adubo Orgânico",
    quantity: "200kg",
    icon: "flower-outline",
  },
  {
    id: "8",
    name: "Fungicida",
    quantity: "3L",
    icon: "medical-outline",
  },
]

const collaboratorsData: CollaboratorItem[] = [
  {
    id: "1",
    name: "João Silva",
    role: "Operador de Tractor",
    icon: "person-outline",
  },
  {
    id: "2",
    name: "Maria Santos",
    role: "Supervisora de Campo",
    icon: "person-outline",
  },
  {
    id: "3",
    name: "António Costa",
    role: "Técnico Agrícola",
    icon: "person-outline",
  },
  {
    id: "4",
    name: "Ana Ferreira",
    role: "Especialista em Culturas",
    icon: "person-outline",
  },
  {
    id: "5",
    name: "Carlos Oliveira",
    role: "Mecânico",
    icon: "person-outline",
  },
  {
    id: "6",
    name: "Sofia Rodrigues",
    role: "Gestora de Qualidade",
    icon: "person-outline",
  },
  {
    id: "7",
    name: "Miguel Pereira",
    role: "Operador de Máquinas",
    icon: "person-outline",
  },
  {
    id: "8",
    name: "Catarina Lopes",
    role: "Engenheira Agrónoma",
    icon: "person-outline",
  },
]

const servicesData: ServiceItem[] = [
  {
    id: "1",
    name: "Manutenção Tractor",
    status: "Pendente",
    icon: "construct-outline",
  },
  {
    id: "2",
    name: "Irrigação",
    status: "Concluído",
    icon: "water-outline",
  },
]

const menuItems = [
  { id: "equipamentos", title: "Equipamentos" },
  { id: "consumiveis", title: "Consumíveis" },
  { id: "colaboradores", title: "Colaboradores" },
  { id: "servicos", title: "Serviços" },
]

const bottomNavItems = [
  { id: "home", icon: "home-outline", label: "", active: false },
  { id: "services", icon: "document-outline", label: "Serviços", active: false },
  { id: "config", icon: "settings-outline", label: "Config", active: true },
  { id: "history", icon: "time-outline", label: "Histórico", active: false },
  { id: "profile", icon: "person-outline", label: "Perfil", active: false },
]

export default function EquipmentScreen() {
  const [activeMenuItem, setActiveMenuItem] = useState("equipamentos")
  const [showAddForm, setShowAddForm] = useState(false)
  const [currentFormType, setCurrentFormType] = useState<"equipamentos" | "consumiveis" | "colaboradores" | "servicos">(
    "equipamentos",
  )
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  // Animation values
  const backgroundScale = useRef(new Animated.Value(1)).current
  const backgroundOpacity = useRef(new Animated.Value(1)).current
  const modalSlide = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const scrollViewRef = useRef<ScrollView>(null)

  // Form data states
  const [equipmentFormData, setEquipmentFormData] = useState<EquipmentFormData>({
    nome: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    potencia: "",
    dataCompra: "",
    valorAquisicao: "",
    unidade: "",
    custoPorUnidade: "",
    observacoes: "",
  })

  const [consumableFormData, setConsumableFormData] = useState<ConsumableFormData>({
    nome: "",
    marca: "",
    referencia: "",
    dataCompra: "",
    valorAquisicao: "",
    unidade: "Kg",
    custoPorUnidade: "",
    observacoes: "",
  })

  const [collaboratorFormData, setCollaboratorFormData] = useState<CollaboratorFormData>({
    nome: "",
    funcao: "",
    dataNascimento: "",
    unidade: "Min",
    custoPorUnidade: "",
    observacoes: "",
  })

  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    nome: "",
    descricaoCurta: "",
    descricaoLonga: "",
    observacoes: "",
    equipamentos: [],
    consumiveis: [],
    colaboradores: [
      { id: "1", name: "José Sousa", enabled: true },
      { id: "2", name: "Paulo Silva", enabled: true },
    ],
  })

  // Selection modal states with pre-selected items
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [selectionType, setSelectionType] = useState<"equipamentos" | "consumiveis" | "colaboradores">("equipamentos")
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(["1", "3"]) // Pre-select Tractor and Pulverizador
  const [selectedConsumables, setSelectedConsumables] = useState<string[]>(["1", "2"]) // Pre-select Fertilizante and Sementes Milho
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>(["3", "5"]) // Pre-select António Costa and Carlos Oliveira

  // Add these new state variables after the existing selection states
  const [equipmentSelectionState, setEquipmentSelectionState] = useState<SelectionItemState[]>(
    equipmentData.map((item) => ({
      id: item.id,
      selected: selectedEquipments.includes(item.id),
      option1: false,
      option2: false,
    })),
  )

  const [consumableSelectionState, setConsumableSelectionState] = useState<SelectionItemState[]>(
    consumablesData.map((item) => ({
      id: item.id,
      selected: selectedConsumables.includes(item.id),
      option1: false,
      option2: false,
    })),
  )

  const [collaboratorSelectionState, setCollaboratorSelectionState] = useState<SelectionItemState[]>(
    collaboratorsData.map((item) => ({
      id: item.id,
      selected: selectedCollaborators.includes(item.id),
      option1: false,
      option2: false,
    })),
  )

  // Validation error states
  const [equipmentErrors, setEquipmentErrors] = useState<ValidationErrors>({})
  const [consumableErrors, setConsumableErrors] = useState<ValidationErrors>({})
  const [collaboratorErrors, setCollaboratorErrors] = useState<ValidationErrors>({})
  const [serviceErrors, setServiceErrors] = useState<ValidationErrors>({})

  // Validation functions
  const validateEquipmentForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!equipmentFormData.nome.trim()) {
      errors.nome = "Nome é obrigatório"
    }

    if (!equipmentFormData.marca.trim()) {
      errors.marca = "Marca é obrigatória"
    }

    if (!equipmentFormData.modelo.trim()) {
      errors.modelo = "Modelo é obrigatório"
    }

    if (!equipmentFormData.numeroSerie.trim()) {
      errors.numeroSerie = "Número de série é obrigatório"
    }

    if (!equipmentFormData.potencia.trim()) {
      errors.potencia = "Potência é obrigatória"
    }

    if (!equipmentFormData.dataCompra.trim()) {
      errors.dataCompra = "Data de compra é obrigatória"
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(equipmentFormData.dataCompra)) {
      errors.dataCompra = "Formato deve ser DD-MM-AAAA"
    }

    if (!equipmentFormData.valorAquisicao.trim()) {
      errors.valorAquisicao = "Valor de aquisição é obrigatório"
    } else if (!/^\d+([.,]\d{1,2})?\s*€?$/.test(equipmentFormData.valorAquisicao)) {
      errors.valorAquisicao = "Formato inválido (ex: 1000,00 €)"
    }

    if (!equipmentFormData.custoPorUnidade.trim()) {
      errors.custoPorUnidade = "Custo por unidade é obrigatório"
    } else if (!/^\d+([.,]\d{1,2})?\s*€?$/.test(equipmentFormData.custoPorUnidade)) {
      errors.custoPorUnidade = "Formato inválido (ex: 10,00 €)"
    }

    setEquipmentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateConsumableForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!consumableFormData.nome.trim()) {
      errors.nome = "Nome é obrigatório"
    }

    if (!consumableFormData.marca.trim()) {
      errors.marca = "Marca é obrigatória"
    }

    if (!consumableFormData.referencia.trim()) {
      errors.referencia = "Referência é obrigatória"
    }

    if (!consumableFormData.dataCompra.trim()) {
      errors.dataCompra = "Data de compra é obrigatória"
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(consumableFormData.dataCompra)) {
      errors.dataCompra = "Formato deve ser DD-MM-AAAA"
    }

    if (!consumableFormData.valorAquisicao.trim()) {
      errors.valorAquisicao = "Valor de aquisição é obrigatório"
    } else if (!/^\d+([.,]\d{1,2})?\s*€?$/.test(consumableFormData.valorAquisicao)) {
      errors.valorAquisicao = "Formato inválido (ex: 100,00 €)"
    }

    if (!consumableFormData.custoPorUnidade.trim()) {
      errors.custoPorUnidade = "Custo por unidade é obrigatório"
    } else if (!/^\d+([.,]\d{1,2})?\s*€?$/.test(consumableFormData.custoPorUnidade)) {
      errors.custoPorUnidade = "Formato inválido (ex: 2,00 €)"
    }

    setConsumableErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateCollaboratorForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!collaboratorFormData.nome.trim()) {
      errors.nome = "Nome é obrigatório"
    } else if (collaboratorFormData.nome.trim().length < 2) {
      errors.nome = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!collaboratorFormData.funcao.trim()) {
      errors.funcao = "Função é obrigatória"
    }

    if (!collaboratorFormData.dataNascimento.trim()) {
      errors.dataNascimento = "Data de nascimento é obrigatória"
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(collaboratorFormData.dataNascimento)) {
      errors.dataNascimento = "Formato deve ser DD-MM-AAAA"
    }

    if (!collaboratorFormData.custoPorUnidade.trim()) {
      errors.custoPorUnidade = "Custo por unidade é obrigatório"
    } else if (!/^\d+([.,]\d{1,2})?\s*€?$/.test(collaboratorFormData.custoPorUnidade)) {
      errors.custoPorUnidade = "Formato inválido (ex: 15,00 €)"
    }

    setCollaboratorErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateServiceForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!serviceFormData.nome.trim()) {
      errors.nome = "Nome é obrigatório"
    } else if (serviceFormData.nome.trim().length < 3) {
      errors.nome = "Nome deve ter pelo menos 3 caracteres"
    }

    if (!serviceFormData.descricaoCurta.trim()) {
      errors.descricaoCurta = "Descrição curta é obrigatória"
    } else if (serviceFormData.descricaoCurta.trim().length < 10) {
      errors.descricaoCurta = "Descrição curta deve ter pelo menos 10 caracteres"
    }

    if (!serviceFormData.descricaoLonga.trim()) {
      errors.descricaoLonga = "Descrição longa é obrigatória"
    } else if (serviceFormData.descricaoLonga.trim().length < 20) {
      errors.descricaoLonga = "Descrição longa deve ter pelo menos 20 caracteres"
    }

    setServiceErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getCurrentErrors = (): ValidationErrors => {
    switch (currentFormType) {
      case "equipamentos":
        return equipmentErrors
      case "consumiveis":
        return consumableErrors
      case "colaboradores":
        return collaboratorErrors
      case "servicos":
        return serviceErrors
      default:
        return {}
    }
  }

  const clearCurrentErrors = () => {
    switch (currentFormType) {
      case "equipamentos":
        setEquipmentErrors({})
        break
      case "consumiveis":
        setConsumableErrors({})
        break
      case "colaboradores":
        setCollaboratorErrors({})
        break
      case "servicos":
        setServiceErrors({})
        break
    }
  }

  // Keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  // Add these helper functions to handle the option toggles
  const handleToggleOption = (id: string, option: "option1" | "option2") => {
    switch (selectionType) {
      case "equipamentos":
        setEquipmentSelectionState((prev) =>
          prev.map((item) => (item.id === id ? { ...item, [option]: !item[option] } : item)),
        )
        break
      case "consumiveis":
        setConsumableSelectionState((prev) =>
          prev.map((item) => (item.id === id ? { ...item, [option]: !item[option] } : item)),
        )
        break
      case "colaboradores":
        setCollaboratorSelectionState((prev) =>
          prev.map((item) => (item.id === id ? { ...item, [option]: !item[option] } : item)),
        )
        break
    }
  }

  const getSelectionState = () => {
    switch (selectionType) {
      case "equipamentos":
        return equipmentSelectionState
      case "consumiveis":
        return consumableSelectionState
      case "colaboradores":
        return collaboratorSelectionState
      default:
        return []
    }
  }

  const handleMenuItemPress = (itemId: string) => {
    setActiveMenuItem(itemId)
  }

  const handleAddItem = (type: "equipamentos" | "consumiveis" | "colaboradores" | "servicos") => {
    setCurrentFormType(type)
    setShowAddForm(true)
    clearCurrentErrors()

    // Animate background shrink and modal slide up
    Animated.parallel([
      Animated.timing(backgroundScale, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalSlide, {
        toValue: 60, // Small margin from top
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Update the handleToggleSelection function to also update our new state
  const handleToggleSelection = (id: string, type: "equipamentos" | "consumiveis" | "colaboradores") => {
    switch (type) {
      case "equipamentos":
        setSelectedEquipments((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        setEquipmentSelectionState((prev) =>
          prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
        )
        break
      case "consumiveis":
        setSelectedConsumables((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        setConsumableSelectionState((prev) =>
          prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
        )
        break
      case "colaboradores":
        setSelectedCollaborators((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        setCollaboratorSelectionState((prev) =>
          prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
        )
        break
    }
  }

  // Update the handleSelectAll and handleClearAll functions
  const handleSelectAll = () => {
    const allIds = getSelectionData().map((item) => item.id)
    switch (selectionType) {
      case "equipamentos":
        setSelectedEquipments(allIds)
        setEquipmentSelectionState((prev) => prev.map((item) => ({ ...item, selected: true })))
        break
      case "consumiveis":
        setSelectedConsumables(allIds)
        setConsumableSelectionState((prev) => prev.map((item) => ({ ...item, selected: true })))
        break
      case "colaboradores":
        setSelectedCollaborators(allIds)
        setCollaboratorSelectionState((prev) => prev.map((item) => ({ ...item, selected: true })))
        break
    }
  }

  const handleClearAll = () => {
    switch (selectionType) {
      case "equipamentos":
        setSelectedEquipments([])
        setEquipmentSelectionState((prev) => prev.map((item) => ({ ...item, selected: false })))
        break
      case "consumiveis":
        setSelectedConsumables([])
        setConsumableSelectionState((prev) => prev.map((item) => ({ ...item, selected: false })))
        break
      case "colaboradores":
        setSelectedCollaborators([])
        setCollaboratorSelectionState((prev) => prev.map((item) => ({ ...item, selected: false })))
        break
    }
  }

  const handleFormSubmit = () => {
    let isValid = false

    switch (currentFormType) {
      case "equipamentos":
        isValid = validateEquipmentForm()
        break
      case "consumiveis":
        isValid = validateConsumableForm()
        break
      case "colaboradores":
        isValid = validateCollaboratorForm()
        break
      case "servicos":
        isValid = validateServiceForm()
        break
    }

    if (isValid) {
      console.log(`${currentFormType} data:`, getCurrentFormData())
      closeModal()
      resetCurrentForm()
    }
  }

  const handleFormCancel = () => {
    closeModal()
    resetCurrentForm()
  }

  const closeModal = () => {
    // Dismiss keyboard first
    Keyboard.dismiss()

    // Animate background back to normal and modal slide down
    Animated.parallel([
      Animated.timing(backgroundScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalSlide, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowAddForm(false)
      setKeyboardHeight(0)
      clearCurrentErrors()
    })
  }

  const getCurrentFormData = () => {
    switch (currentFormType) {
      case "equipamentos":
        return equipmentFormData
      case "consumiveis":
        return consumableFormData
      case "colaboradores":
        return collaboratorFormData
      case "servicos":
        return serviceFormData
      default:
        return equipmentFormData
    }
  }

  const resetCurrentForm = () => {
    switch (currentFormType) {
      case "equipamentos":
        setEquipmentFormData({
          nome: "",
          marca: "",
          modelo: "",
          numeroSerie: "",
          potencia: "",
          dataCompra: "",
          valorAquisicao: "",
          unidade: "",
          custoPorUnidade: "",
          observacoes: "",
        })
        break
      case "consumiveis":
        setConsumableFormData({
          nome: "",
          marca: "",
          referencia: "",
          dataCompra: "",
          valorAquisicao: "",
          unidade: "Kg",
          custoPorUnidade: "",
          observacoes: "",
        })
        break
      case "colaboradores":
        setCollaboratorFormData({
          nome: "",
          funcao: "",
          dataNascimento: "",
          unidade: "Min",
          custoPorUnidade: "",
          observacoes: "",
        })
        break
      case "servicos":
        setServiceFormData({
          nome: "",
          descricaoCurta: "",
          descricaoLonga: "",
          observacoes: "",
          equipamentos: [],
          consumiveis: [],
          colaboradores: [
            { id: "1", name: "José Sousa", enabled: true },
            { id: "2", name: "Paulo Silva", enabled: true },
          ],
        })
        // Keep pre-selected items when resetting services form
        setSelectedEquipments(["1", "3"])
        setSelectedConsumables(["1", "2"])
        setSelectedCollaborators([])
        break
    }
  }

  const updateEquipmentFormData = (field: keyof EquipmentFormData, value: string) => {
    setEquipmentFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (equipmentErrors[field]) {
      setEquipmentErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const updateConsumableFormData = (field: keyof ConsumableFormData, value: string) => {
    setConsumableFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (consumableErrors[field]) {
      setConsumableErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const updateCollaboratorFormData = (field: keyof CollaboratorFormData, value: string) => {
    setCollaboratorFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (collaboratorErrors[field]) {
      setCollaboratorErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const updateServiceFormData = (field: keyof ServiceFormData, value: any) => {
    setServiceFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (serviceErrors[field]) {
      setServiceErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const toggleCollaboratorInService = (collaboratorId: string) => {
    setServiceFormData((prev) => ({
      ...prev,
      colaboradores: prev.colaboradores.map((collab) =>
        collab.id === collaboratorId ? { ...collab, enabled: !collab.enabled } : collab,
      ),
    }))
  }

  const handleOpenSelection = (type: "equipamentos" | "consumiveis" | "colaboradores") => {
    setSelectionType(type)
    setShowSelectionModal(true)
  }

  const handleCloseSelection = () => {
    setShowSelectionModal(false)
  }

  // Update the useEffect to initialize the selection states when the modal opens
  useEffect(() => {
    if (showSelectionModal) {
      setEquipmentSelectionState(
        equipmentData.map((item) => ({
          id: item.id,
          selected: selectedEquipments.includes(item.id),
          option1: false,
          option2: false,
        })),
      )

      setConsumableSelectionState(
        consumablesData.map((item) => ({
          id: item.id,
          selected: selectedConsumables.includes(item.id),
          option1: false,
          option2: false,
        })),
      )

      setCollaboratorSelectionState(
        collaboratorsData.map((item) => ({
          id: item.id,
          selected: selectedCollaborators.includes(item.id),
          option1: false,
          option2: false,
        })),
      )
    }
  }, [showSelectionModal, selectedEquipments, selectedConsumables, selectedCollaborators])

  const getSelectionData = () => {
    switch (selectionType) {
      case "equipamentos":
        return equipmentData
      case "consumiveis":
        return consumablesData
      case "colaboradores":
        return collaboratorsData
      default:
        return []
    }
  }

  const getSelectedItems = () => {
    switch (selectionType) {
      case "equipamentos":
        return selectedEquipments
      case "consumiveis":
        return selectedConsumables
      case "colaboradores":
        return selectedCollaborators
      default:
        return []
    }
  }

  const getSelectionTitle = () => {
    switch (selectionType) {
      case "equipamentos":
        return "Selecionar Equipamentos"
      case "consumiveis":
        return "Selecionar Consumíveis"
      case "colaboradores":
        return "Selecionar Colaboradores"
      default:
        return "Selecionar"
    }
  }

  const handleInputFocus = (inputRef?: any) => {
    // Small delay to ensure keyboard is shown
    setTimeout(() => {
      if (scrollViewRef.current && inputRef) {
        inputRef.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          const scrollToY = Math.max(0, pageY - 200) // Scroll to show input with padding
          scrollViewRef.current?.scrollTo({ y: scrollToY, animated: true })
        })
      }
    }, 150)
  }

  // Now replace the renderSelectionModal function with this updated version
  const renderSelectionModal = () => (
    <View style={styles.selectionModalOverlay}>
      <TouchableOpacity style={styles.selectionModalBackdrop} onPress={handleCloseSelection} activeOpacity={1} />

      <Animated.View style={styles.selectionModalContainer}>
        <View style={styles.selectionModalHeader}>
          <Text style={styles.selectionModalTitle}>{getSelectionTitle()}</Text>
          <TouchableOpacity onPress={handleCloseSelection} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 10 }}>
          {selectionType === "equipamentos" && (
            <>
              {equipmentData.slice(0, 2).map((item) => {
                const isSelected = selectedEquipments.includes(item.id);
                return (
                  <View key={item.id} style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={[styles.optionCheckbox, isSelected && styles.optionCheckboxSelected]}
                      onPress={() => handleToggleSelection(item.id, "equipamentos")}
                    >
                      {isSelected && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                    </TouchableOpacity>
                    <Text style={styles.optionLabel}>{item.name}</Text>
                  </View>
                );
              })}
            </>
          )}
          {selectionType === "consumiveis" && (
            <>
              {consumablesData.slice(0, 2).map((item) => {
                const isSelected = selectedConsumables.includes(item.id);
                return (
                  <View key={item.id} style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={[styles.optionCheckbox, isSelected && styles.optionCheckboxSelected]}
                      onPress={() => handleToggleSelection(item.id, "consumiveis")}
                    >
                      {isSelected && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                    </TouchableOpacity>
                    <Text style={styles.optionLabel}>{item.name}</Text>
                  </View>
                );
              })}
            </>
          )}
          {selectionType === "colaboradores" && (
            <>
              {collaboratorsData.slice(0, 2).map((item) => {
                const isSelected = selectedCollaborators.includes(item.id);
                return (
                  <View key={item.id} style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={[styles.optionCheckbox, isSelected && styles.optionCheckboxSelected]}
                      onPress={() => handleToggleSelection(item.id, "colaboradores")}
                    >
                      {isSelected && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                    </TouchableOpacity>
                    <Text style={styles.optionLabel}>{item.name}</Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
        
        <View style={styles.selectionChoicesContainer}>
          <TouchableOpacity style={[styles.choiceButton, styles.choiceButtonPrimary]} onPress={() => handleSelectAll()}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.choiceButtonTextPrimary}>Selecionar Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.choiceButton, styles.choiceButtonSecondary]}
            onPress={() => handleClearAll()}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
            <Text style={styles.choiceButtonTextSecondary}>Limpar Seleção</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.selectionModalScrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.selectionModalContentContainer}>
            {getSelectionData().map((item) => {
              const isSelected = getSelectedItems().includes(item.id)
              const itemState = getSelectionState().find((state) => state.id === item.id) || {
                option1: false,
                option2: false,
              }

              const getOptionLabel = () => {
                switch (selectionType) {
                  case "equipamentos":
                    return { option1: "Disponível", option2: "Manutenção" }
                  case "consumiveis":
                    return { option1: "Em stock", option2: "Encomendar" }
                  case "colaboradores":
                    return { option1: "Disponível", option2: "Especialista" }
                  default:
                    return { option1: "Opção 1", option2: "Opção 2" }
                }
              }

              const optionLabels = getOptionLabel()

              return (
                <View key={item.id} style={[styles.selectionItem, isSelected && styles.selectionItemSelected]}>
                  <TouchableOpacity
                    style={styles.selectionItemMain}
                    onPress={() => handleToggleSelection(item.id, selectionType)}
                  >
                    <View style={styles.selectionItemIcon}>
                      <Ionicons
                        name={selectionType === "colaboradores" ? "person" : item.icon}
                        size={24}
                        color={isSelected ? "#4CAF50" : "#666"}
                      />
                    </View>
                    <View style={styles.selectionItemInfo}>
                      <Text style={[styles.selectionItemName, isSelected && styles.selectionItemNameSelected]}>
                        {item.name}
                      </Text>
                      <Text style={styles.selectionItemSubtitle}>
                        {selectionType === "equipamentos"
                      ? (item as EquipmentItem).brand
                      : selectionType === "consumiveis"
                        ? (item as ConsumableItem).quantity
                        : (item as CollaboratorItem).role}
                      </Text>
                    </View>
                    <View style={[styles.selectionCheckbox, isSelected && styles.selectionCheckboxSelected]}>
                      {isSelected && <Ionicons name="checkmark" size={20} color="#4CAF50" />}
                    </View>
                  </TouchableOpacity>

                  {isSelected && (
                    <View style={styles.selectionItemOptions}>
                      <TouchableOpacity
                        style={styles.selectionItemOption}
                        onPress={() => handleToggleOption(item.id, "option1")}
                      >
                        <View style={[styles.optionCheckbox, itemState.option1 && styles.optionCheckboxSelected]}>
                          {itemState.option1 && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                        </View>
                        <Text style={styles.optionLabel}>{optionLabels.option1}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.selectionItemOption}
                        onPress={() => handleToggleOption(item.id, "option2")}
                      >
                        <View style={[styles.optionCheckbox, itemState.option2 && styles.optionCheckboxSelected]}>
                          {itemState.option2 && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                        </View>
                        <Text style={styles.optionLabel}>{optionLabels.option2}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </ScrollView>

        <View style={styles.selectionModalButtons}>
          <TouchableOpacity style={styles.selectionConfirmButton} onPress={handleCloseSelection}>
            <Text style={styles.selectionConfirmButtonText}>Confirmar Seleção</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={[styles.logoDot, { backgroundColor: "#4CAF50" }]} />
          <View style={[styles.logoDot, { backgroundColor: "#2196F3" }]} />
          <View style={[styles.logoDot, { backgroundColor: "#FF5722" }]} />
          <View style={[styles.logoDot, { backgroundColor: "#8B4513" }]} />
        </View>

        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="people-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="bag-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  const renderScrollableMenu = () => (
    <View style={styles.menuContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuScrollContent}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, activeMenuItem === item.id && styles.activeMenuItem]}
            onPress={() => handleMenuItemPress(item.id)}
          >
            <Text style={[styles.menuText, activeMenuItem === item.id && styles.activeMenuText]}>{item.title}</Text>
            {activeMenuItem === item.id && <View style={styles.menuUnderline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  const renderFormField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    fieldKey: string,
    placeholder?: string,
    multiline?: boolean,
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad",
  ) => {
    let inputRef: TextInput | null = null
    const errors = getCurrentErrors()
    const hasError = !!errors[fieldKey]

    return (
      <View style={[styles.formField, multiline && styles.formFieldMultiline]}>
        <Text style={styles.formLabel}>{label}</Text>
        <TextInput
          ref={(ref) => {
            inputRef = ref
          }}
          style={[styles.formInput, multiline && styles.formInputMultiline, hasError && styles.formInputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          onFocus={() => handleInputFocus(inputRef)}
          keyboardType={keyboardType || "default"}
        />
        {hasError && <Text style={styles.errorText}>{errors[fieldKey]}</Text>}
      </View>
    )
  }

  const renderDropdownField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    fieldKey: string,
  ) => {
    let inputRef: TextInput | null = null
    const errors = getCurrentErrors()
    const hasError = !!errors[fieldKey]

    return (
      <View style={styles.formField}>
        <Text style={styles.formLabel}>{label}</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            ref={(ref) => {
              inputRef = ref
            }}
            style={[styles.formInput, hasError && styles.formInputError]}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#999"
            onFocus={() => handleInputFocus(inputRef)}
          />
          <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
        </View>
        {hasError && <Text style={styles.errorText}>{errors[fieldKey]}</Text>}
      </View>
    )
  }

  const renderEquipmentForm = () => (
    <View style={styles.formContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.formTitle}>Adicionar /Editar</Text>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.formScrollContent}
        >
          <View style={styles.formGrid}>
            {renderFormField(
              "Nome",
              equipmentFormData.nome,
              (text) => updateEquipmentFormData("nome", text),
              "nome",
              "Tractor",
            )}

            <View style={styles.formRow}>
              {renderFormField(
                "Marca",
                equipmentFormData.marca,
                (text) => updateEquipmentFormData("marca", text),
                "marca",
                "XPTO",
              )}
              {renderFormField(
                "Modelo",
                equipmentFormData.modelo,
                (text) => updateEquipmentFormData("modelo", text),
                "modelo",
                "XPTO",
              )}
            </View>

            <View style={styles.formRow}>
              {renderFormField(
                "N. série",
                equipmentFormData.numeroSerie,
                (text) => updateEquipmentFormData("numeroSerie", text),
                "numeroSerie",
                "7729937761",
              )}
              {renderFormField(
                "Potência",
                equipmentFormData.potencia,
                (text) => updateEquipmentFormData("potencia", text),
                "potencia",
                "150 CV",
              )}
            </View>

            <View style={styles.formRow}>
              {renderFormField(
                "Data Compra",
                equipmentFormData.dataCompra,
                (text) => updateEquipmentFormData("dataCompra", text),
                "dataCompra",
                "25-01-1985",
              )}
              {renderFormField(
                "Valor Aquisição",
                equipmentFormData.valorAquisicao,
                (text) => updateEquipmentFormData("valorAquisicao", text),
                "valorAquisicao",
                "45.000,00 €",
              )}
            </View>

            <View style={styles.formRow}>
              {renderFormField(
                "Unidade",
                equipmentFormData.unidade,
                (text) => updateEquipmentFormData("unidade", text),
                "unidade",
                "Min",
              )}
              {renderFormField(
                "Custo por unidade",
                equipmentFormData.custoPorUnidade,
                (text) => updateEquipmentFormData("custoPorUnidade", text),
                "custoPorUnidade",
                "2,00 €",
              )}
            </View>

            {renderFormField(
              "Observações",
              equipmentFormData.observacoes,
              (text) => updateEquipmentFormData("observacoes", text),
              "observacoes",
              "600 kg",
              true,
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )

  const renderConsumableForm = () => (
    <View style={styles.formContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.formTitle}>Adicionar /Editar</Text>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.formScrollContent}
        >
          <View style={styles.formGrid}>
            {renderFormField(
              "Nome",
              consumableFormData.nome,
              (text) => updateConsumableFormData("nome", text),
              "nome",
              "Adubo",
            )}

            <View style={styles.formRow}>
              {renderFormField(
                "Marca",
                consumableFormData.marca,
                (text) => updateConsumableFormData("marca", text),
                "marca",
                "XPTO",
              )}
              {renderFormField(
                "Referência",
                consumableFormData.referencia,
                (text) => updateConsumableFormData("referencia", text),
                "referencia",
                "XPTO",
              )}
            </View>

            <View style={styles.formRow}>
              {renderFormField(
                "Data Compra",
                consumableFormData.dataCompra,
                (text) => updateConsumableFormData("dataCompra", text),
                "dataCompra",
                "25-01-1985",
              )}
              {renderFormField(
                "Valor Aquisição",
                consumableFormData.valorAquisicao,
                (text) => updateConsumableFormData("valorAquisicao", text),
                "valorAquisicao",
                "14,00 €",
              )}
            </View>

            <View style={styles.formRow}>
              {renderDropdownField(
                "Unidade",
                consumableFormData.unidade,
                (text) => updateConsumableFormData("unidade", text),
                "unidade",
              )}
              {renderFormField(
                "Custo por unidade",
                consumableFormData.custoPorUnidade,
                (text) => updateConsumableFormData("custoPorUnidade", text),
                "custoPorUnidade",
                "2,00 €",
              )}
            </View>

            {renderFormField(
              "Observações",
              consumableFormData.observacoes,
              (text) => updateConsumableFormData("observacoes", text),
              "observacoes",
              "600 Kg",
              true,
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )

  const renderCollaboratorForm = () => (
    <View style={styles.formContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.formTitle}>Adicionar /Editar</Text>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.formScrollContent}
        >
          <View style={styles.formGrid}>
            {renderFormField(
              "Nome",
              collaboratorFormData.nome,
              (text) => updateCollaboratorFormData("nome", text),
              "nome",
              "António da Silva",
            )}

            <View style={styles.formRow}>
              {renderFormField(
                "Função",
                collaboratorFormData.funcao,
                (text) => updateCollaboratorFormData("funcao", text),
                "funcao",
                "XPTO",
              )}
              {renderFormField(
                "Data Nascimento",
                collaboratorFormData.dataNascimento,
                (text) => updateCollaboratorFormData("dataNascimento", text),
                "dataNascimento",
                "25-01-1985",
              )}
            </View>

            <View style={styles.formRow}>
              {renderDropdownField(
                "Unidade",
                collaboratorFormData.unidade,
                (text) => updateCollaboratorFormData("unidade", text),
                "unidade",
              )}
              {renderFormField(
                "Custo por unidade",
                collaboratorFormData.custoPorUnidade,
                (text) => updateCollaboratorFormData("custoPorUnidade", text),
                "custoPorUnidade",
                "14,00 €",
              )}
            </View>

            {renderFormField(
              "Observações",
              collaboratorFormData.observacoes,
              (text) => updateCollaboratorFormData("observacoes", text),
              "observacoes",
              "600 Kg",
              true,
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )

  const renderServiceForm = () => (
    <View style={styles.formContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.formTitle}>Adicionar /Editar</Text>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.formScrollContent}
        >
          <View style={styles.formGrid}>
            {renderFormField(
              "Nome",
              serviceFormData.nome,
              (text) => updateServiceFormData("nome", text),
              "nome",
              "Limpeza de terreno",
            )}
            {renderFormField(
              "Descrição curta",
              serviceFormData.descricaoCurta,
              (text) => updateServiceFormData("descricaoCurta", text),
              "descricaoCurta",
              "O serviço é...",
              true,
            )}
            {renderFormField(
              "Descrição longa",
              serviceFormData.descricaoLonga,
              (text) => updateServiceFormData("descricaoLonga", text),
              "descricaoLonga",
              "O serviço é...",
              true,
            )}
            {renderFormField(
              "Observações",
              serviceFormData.observacoes,
              (text) => updateServiceFormData("observacoes", text),
              "observacoes",
              "",
              true,
            )}

            <View style={styles.serviceSection}>
              <View style={styles.serviceSectionHeader}>
                <Text style={styles.serviceSectionTitle}>Adicionar Equipamentos</Text>
                <TouchableOpacity style={styles.addServiceButton} onPress={() => handleOpenSelection("equipamentos")}>
                  <Ionicons name="add" size={16} color="#2196F3" />
                  <Text style={styles.addServiceButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>

              {selectedEquipments.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                  {selectedEquipments.map((equipmentId) => {
                    const equipment = equipmentData.find((item) => item.id === equipmentId)
                    return equipment ? (
                      <View key={equipmentId} style={styles.selectedItem}>
                        <View style={styles.selectedItemIcon}>
                          <Ionicons name={equipment.icon} size={20} color="#4CAF50" />
                        </View>
                        <Text style={styles.selectedItemText}>{equipment.name}</Text>
                        <TouchableOpacity
                          onPress={() => handleToggleSelection(equipmentId, "equipamentos")}
                          style={styles.removeItemButton}
                        >
                          <Ionicons name="close" size={16} color="#FF5722" />
                        </TouchableOpacity>
                      </View>
                    ) : null
                  })}
                </View>
              )}
            </View>

            <View style={styles.serviceSection}>
              <View style={styles.serviceSectionHeader}>
                <Text style={styles.serviceSectionTitle}>Adicionar Consumíveis</Text>
                <TouchableOpacity style={styles.addServiceButton} onPress={() => handleOpenSelection("consumiveis")}>
                  <Ionicons name="add" size={16} color="#2196F3" />
                  <Text style={styles.addServiceButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>

              {selectedConsumables.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                  {selectedConsumables.map((consumableId) => {
                    const consumable = consumablesData.find((item) => item.id === consumableId)
                    return consumable ? (
                      <View key={consumableId} style={styles.selectedItem}>
                        <View style={styles.selectedItemIcon}>
                          <Ionicons name={consumable.icon} size={20} color="#4CAF50" />
                        </View>
                        <Text style={styles.selectedItemText}>{consumable.name}</Text>
                        <TouchableOpacity
                          onPress={() => handleToggleSelection(consumableId, "consumiveis")}
                          style={styles.removeItemButton}
                        >
                          <Ionicons name="close" size={16} color="#FF5722" />
                        </TouchableOpacity>
                      </View>
                    ) : null
                  })}
                </View>
              )}
            </View>

            <View style={styles.serviceSection}>
              <View style={styles.serviceSectionHeader}>
                <Text style={styles.serviceSectionTitle}>Adicionar Colaboradores</Text>
                <TouchableOpacity style={styles.addServiceButton} onPress={() => handleOpenSelection("colaboradores")}>
                  <Ionicons name="add" size={16} color="#2196F3" />
                  <Text style={styles.addServiceButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>

              {/* Original pre-selected collaborators */}
              {serviceFormData.colaboradores.map((colaborador) => (
                <View key={colaborador.id} style={styles.collaboratorItem}>
                  <Switch
                    value={colaborador.enabled}
                    onValueChange={() => toggleCollaboratorInService(colaborador.id)}
                    trackColor={{ false: "#ccc", true: "#4CAF50" }}
                    thumbColor={colaborador.enabled ? "#fff" : "#fff"}
                  />
                  <View style={styles.collaboratorAvatar}>
                    <Ionicons name="person" size={20} color="#8B4513" />
                  </View>
                  <Text style={styles.collaboratorName}>{colaborador.name}</Text>
                </View>
              ))}

              {/* Newly selected collaborators */}
              {selectedCollaborators.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                  {selectedCollaborators.map((collaboratorId) => {
                    const collaborator = collaboratorsData.find((item) => item.id === collaboratorId)
                    // Skip if this collaborator is already in the pre-selected list
                    if (serviceFormData.colaboradores.some((c) => c.id === collaboratorId)) {
                      return null
                    }
                    return collaborator ? (
                      <View key={collaboratorId} style={styles.selectedItem}>
                        <View style={styles.selectedItemIcon}>
                          <Ionicons name="person" size={20} color="#4CAF50" />
                        </View>
                        <Text style={styles.selectedItemText}>{collaborator.name}</Text>
                        <TouchableOpacity
                          onPress={() => handleToggleSelection(collaboratorId, "colaboradores")}
                          style={styles.removeItemButton}
                        >
                          <Ionicons name="close" size={16} color="#FF5722" />
                        </TouchableOpacity>
                      </View>
                    ) : null
                  })}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )

  const renderCurrentForm = () => {
    switch (currentFormType) {
      case "equipamentos":
        return renderEquipmentForm()
      case "consumiveis":
        return renderConsumableForm()
      case "colaboradores":
        return renderCollaboratorForm()
      case "servicos":
        return renderServiceForm()
      default:
        return renderEquipmentForm()
    }
  }

  const renderEquipmentContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.contentHeader}>
        <Text style={styles.contentTitle}>Equipamentos</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem("equipamentos")}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemList}>
        {equipmentData.slice(0, 2).map((item) => (
          <TouchableOpacity key={item.id} style={styles.listItem}>
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon} size={32} color="#333" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.brand}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderConsumablesContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.contentHeader}>
        <Text style={styles.contentTitle}>Consumíveis</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem("consumiveis")}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemList}>
        {consumablesData.slice(0, 2).map((item) => (
          <TouchableOpacity key={item.id} style={styles.listItem}>
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon} size={32} color="#333" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.quantity}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderCollaboratorsContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.contentHeader}>
        <Text style={styles.contentTitle}>Colaboradores</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem("colaboradores")}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemList}>
        {collaboratorsData.slice(0, 2).map((item) => (
          <TouchableOpacity key={item.id} style={styles.listItem}>
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon} size={32} color="#333" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.role}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderServicesContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.contentHeader}>
        <Text style={styles.contentTitle}>Serviços</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem("servicos")}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemList}>
        {servicesData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.listItem}>
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon} size={32} color="#333" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={[styles.itemSubtitle, item.status === "Concluído" && styles.completedStatus]}>
                {item.status}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderContent = () => {
    switch (activeMenuItem) {
      case "equipamentos":
        return renderEquipmentContent()
      case "consumiveis":
        return renderConsumablesContent()
      case "colaboradores":
        return renderCollaboratorsContent()
      case "servicos":
        return renderServicesContent()
      default:
        return renderEquipmentContent()
    }
  }

  const renderBottomNavigation = () => (
    <View style={styles.bottomNav}>
      {bottomNavItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.bottomNavItem}>
          <Ionicons name={item.icon as React.ComponentProps<typeof Ionicons>['name']} size={24} color={item.active ? "#D2691E" : "#999"} />
          {item.label ? (
            <Text style={[styles.bottomNavLabel, item.active && styles.activeBottomNavLabel]}>{item.label}</Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D2691E" />

      {/* Main Background Content with Animation */}
      <Animated.View
        style={[
          styles.backgroundContent,
          {
            transform: [{ scale: backgroundScale }],
            opacity: backgroundOpacity,
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {renderHeader()}
          {renderScrollableMenu()}
          <ScrollView style={styles.mainContent}>{renderContent()}</ScrollView>
          {renderBottomNavigation()}
        </SafeAreaView>
      </Animated.View>

      {/* Modal Overlay */}
      {showAddForm && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={closeModal} activeOpacity={1} />

          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: modalSlide }],
              },
            ]}
          >
            {renderCurrentForm()}

            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleFormCancel}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton} onPress={handleFormSubmit}>
                <Ionicons name="checkmark" size={20} color="#fff" />
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Selection Modal */}
      {showSelectionModal && renderSelectionModal()}
    </View>
  )
}

// Add these new styles
const additionalStyles = {
  selectionItemMain: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  selectionItemOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingLeft: 56,
    width: "100%",
  },
  selectionItemOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  optionCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  optionCheckboxSelected: {
    backgroundColor: "#f0f8f0",
    borderColor: "#4CAF50",
  },
  optionLabel: {
    fontSize: 14,
    color: "#666",
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundContent: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: "#D2691E",
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  headerRightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 16,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuScrollContent: {
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginRight: 8,
    position: "relative",
  },
  activeMenuItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#D2691E",
  },
  menuText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  activeMenuText: {
    color: "#D2691E",
    fontWeight: "600",
  },
  menuUnderline: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: "#D2691E",
  },
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "600",
  },
  itemList: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  completedStatus: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 8,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  bottomNavLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  activeBottomNavLabel: {
    color: "#D2691E",
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT - 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  closeButton: {
    padding: 4,
  },
  // Form styles
  formContent: {
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    flex: 1,
  },
  formScrollView: {
    flex: 1,
  },
  formScrollContent: {
    paddingBottom: 120, // Space for buttons
  },
  formGrid: {
    padding: 20,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  formField: {
    flex: 1,
    marginBottom: 16,
  },
  formFieldMultiline: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  formInput: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  formInputError: {
    borderColor: "#FF5722",
    borderWidth: 2,
  },
  formInputMultiline: {
    height: 80,
    textAlignVertical: "top",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownIcon: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  errorText: {
    color: "#FF5722",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  formButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  // Service form specific styles
  serviceSection: {
    marginBottom: 20,
  },
  serviceSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addServiceButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addServiceButtonText: {
    color: "#2196F3",
    marginLeft: 4,
    fontWeight: "600",
  },
  collaboratorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  collaboratorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#D2B48C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
  },
  collaboratorName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  // Selection modal styles
  selectionModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  selectionModalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  selectionModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: SCREEN_WIDTH - 40,
    maxHeight: SCREEN_HEIGHT * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  selectionModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectionModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  selectionModalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectionItem: {
    flexDirection: "column",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  selectionItemSelected: {
    backgroundColor: "#f0f8f0",
  },
  selectionItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  selectionItemInfo: {
    flex: 1,
  },
  selectionItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  selectionItemNameSelected: {
    color: "#4CAF50",
  },
  selectionItemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  selectionCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  selectionModalButtons: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  selectionConfirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  selectionConfirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Selected items display styles
  selectedItemsContainer: {
    marginTop: 12,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  selectedItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedItemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  removeItemButton: {
    padding: 4,
  },
  selectionChoicesContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  choiceButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  choiceButtonPrimary: {
    backgroundColor: "#4CAF50",
  },
  choiceButtonSecondary: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  choiceButtonTextPrimary: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  choiceButtonTextSecondary: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  selectionModalScrollContent: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT * 0.4,
  },
  selectionModalContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  selectionCheckboxSelected: {
    backgroundColor: "#f0f8f0",
    borderColor: "#4CAF50",
  },
  // New styles for the option checkboxes
  selectionItemMain: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  selectionItemOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingLeft: 56,
    width: "100%",
  },
  selectionItemOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  optionCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  optionCheckboxSelected: {
    backgroundColor: "#f0f8f0",
    borderColor: "#4CAF50",
  },
  optionLabel: {
    fontSize: 14,
    color: "#666",
  },
})

// Merge the additional styles into the existing styles object
Object.assign(styles, additionalStyles)
