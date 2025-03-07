
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { ClassType, classTypeDetails, intensityLevels } from "@/utils/data";
import { useToast } from "@/hooks/use-toast";

const TiposClase = () => {
  const [classTypes, setClassTypes] = useState<ClassType[]>(classTypeDetails);
  const [editingClassType, setEditingClassType] = useState<ClassType | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Nuevo tipo de clase vacío
  const emptyClassType: Omit<ClassType, 'id'> = {
    name: '',
    description: '',
    intensity: 'Media',
    visible: true
  };

  // Estado para el formulario
  const [formData, setFormData] = useState<Omit<ClassType, 'id'>>(emptyClassType);

  // Manejo de cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de cambios en el select
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      intensity: value as "Baja" | "Media" | "Fuerte" 
    }));
  };

  // Manejo de cambios en el switch
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, visible: checked }));
  };

  // Agregar un nuevo tipo de clase
  const handleAddClassType = () => {
    const newClassType: ClassType = {
      id: Math.max(0, ...classTypes.map(ct => ct.id)) + 1,
      ...formData
    };
    
    setClassTypes(prev => [...prev, newClassType]);
    setFormData(emptyClassType);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Tipo de clase creado",
      description: `${newClassType.name} ha sido añadido correctamente.`,
    });
  };

  // Editar un tipo de clase existente
  const handleEditClassType = () => {
    if (!editingClassType) return;
    
    setClassTypes(prev => 
      prev.map(ct => 
        ct.id === editingClassType.id ? { ...editingClassType, ...formData } : ct
      )
    );
    
    setEditingClassType(null);
    setFormData(emptyClassType);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Tipo de clase actualizado",
      description: `${formData.name} ha sido actualizado correctamente.`,
    });
  };

  // Eliminar un tipo de clase
  const handleDeleteClassType = () => {
    if (!editingClassType) return;
    
    setClassTypes(prev => prev.filter(ct => ct.id !== editingClassType.id));
    setEditingClassType(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Tipo de clase eliminado",
      description: `El tipo de clase ha sido eliminado correctamente.`,
      variant: "destructive",
    });
  };

  // Abrir diálogo de edición
  const openEditDialog = (classType: ClassType) => {
    setEditingClassType(classType);
    setFormData({
      name: classType.name,
      description: classType.description,
      intensity: classType.intensity,
      visible: classType.visible
    });
    setIsEditDialogOpen(true);
  };

  // Abrir diálogo de eliminación
  const openDeleteDialog = (classType: ClassType) => {
    setEditingClassType(classType);
    setIsDeleteDialogOpen(true);
  };

  // Abrir diálogo de creación
  const openAddDialog = () => {
    setFormData(emptyClassType);
    setIsAddDialogOpen(true);
  };

  // Renderizar un badge para la intensidad
  const renderIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case "Baja":
        return <span className="badge-low">Baja</span>;
      case "Media":
        return <span className="badge-medium">Media</span>;
      case "Fuerte":
        return <span className="badge-high">Fuerte</span>;
      default:
        return <span className="badge-medium">Media</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Tipos de Clase</h1>
          <p className="text-muted-foreground mt-2">
            Administra los diferentes tipos de clases que ofrece el estudio.
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={openAddDialog}>
              <Plus size={18} />
              Nuevo Tipo de Clase
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Tipo de Clase</DialogTitle>
              <DialogDescription>
                Completa los campos para crear un nuevo tipo de clase.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la clase</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Barre Sculpt"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción de la clase</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe brevemente en qué consiste la clase..."
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="intensity">Intensidad</Label>
                <Select 
                  value={formData.intensity} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="intensity">
                    <SelectValue placeholder="Selecciona la intensidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {intensityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="visible">Visible para los clientes</Label>
                <Switch
                  id="visible"
                  checked={formData.visible}
                  onCheckedChange={handleSwitchChange}
                />
                <span className="text-sm text-muted-foreground ml-2">
                  {formData.visible ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleAddClassType}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tipos de Clase Actuales</CardTitle>
          <CardDescription>
            Listado de todos los tipos de clases disponibles en el estudio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table className="data-table">
              <TableHeader className="table-header">
                <TableRow>
                  <TableHead className="table-header-cell">Nombre</TableHead>
                  <TableHead className="table-header-cell">Descripción</TableHead>
                  <TableHead className="table-header-cell">Intensidad</TableHead>
                  <TableHead className="table-header-cell">Visible</TableHead>
                  <TableHead className="table-header-cell">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-body">
                {classTypes.map(classType => (
                  <TableRow key={classType.id} className="table-row">
                    <TableCell className="table-cell font-medium">{classType.name}</TableCell>
                    <TableCell className="table-cell max-w-xs truncate">{classType.description}</TableCell>
                    <TableCell className="table-cell">
                      {renderIntensityBadge(classType.intensity)}
                    </TableCell>
                    <TableCell className="table-cell">
                      <span className={`status-chip ${classType.visible ? 'status-success' : 'status-danger'}`}>
                        {classType.visible ? 'Sí' : 'No'}
                      </span>
                    </TableCell>
                    <TableCell className="table-cell">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(classType)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(classType)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Tipo de Clase</DialogTitle>
            <DialogDescription>
              Modifica los campos del tipo de clase seleccionado.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nombre de la clase</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción de la clase</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-intensity">Intensidad</Label>
              <Select 
                value={formData.intensity} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="edit-intensity">
                  <SelectValue placeholder="Selecciona la intensidad" />
                </SelectTrigger>
                <SelectContent>
                  {intensityLevels.map((level) => (
                    <SelectItem key={`edit-${level}`} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-visible">Visible para los clientes</Label>
              <Switch
                id="edit-visible"
                checked={formData.visible}
                onCheckedChange={handleSwitchChange}
              />
              <span className="text-sm text-muted-foreground ml-2">
                {formData.visible ? 'Sí' : 'No'}
              </span>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleEditClassType}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas eliminar este tipo de clase? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {editingClassType && (
            <div className="py-4">
              <p className="font-medium">{editingClassType.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{editingClassType.description}</p>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteClassType}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TiposClase;
