
import { useState } from 'react';
import { instructors } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription, 
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const Instructores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editInstructor, setEditInstructor] = useState<number | null>(null);
  
  const filteredInstructors = instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Instructor añadido con éxito');
  };
  
  const handleEditInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    setEditInstructor(null);
    toast.success('Instructor actualizado con éxito');
  };
  
  const selectedInstructor = editInstructor !== null ? instructors.find(i => i.id === editInstructor) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-display">Instructores</h1>
        <p className="text-muted-foreground">Gestiona el equipo de instructores de Enoia Barre Studio.</p>
      </div>
      
      {/* Search and add */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar instructores..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              <span>Añadir Instructor</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-xl font-display">Añadir Nuevo Instructor</DialogTitle>
              <DialogDescription>
                Complete los detalles para añadir un nuevo instructor al equipo.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddInstructor} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nombre completo</label>
                  <Input id="name" placeholder="Ej. Carmen Díaz" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="ejemplo@enoiabarre.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Teléfono</label>
                  <Input id="phone" placeholder="+34 600 000 000" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">Biografía</label>
                  <textarea 
                    id="bio" 
                    className="form-input min-h-[100px]" 
                    placeholder="Breve biografía y especialidades"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="photo" className="text-sm font-medium">URL de la foto</label>
                  <Input id="photo" placeholder="https://ejemplo.com/foto.jpg" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button type="submit">
                  Añadir Instructor
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Instructor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id} className="card-hover flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={instructor.photo} 
                    alt={instructor.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg font-medium">{instructor.name}</CardTitle>
                  <CardDescription className="mt-1">Instructor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-2 flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">{instructor.bio}</p>
              
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-1">
                  <Mail size={14} className="text-muted-foreground" />
                  <span className="text-sm">{instructor.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={14} className="text-muted-foreground" />
                  <span className="text-sm">{instructor.phone}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 gap-1"
                onClick={() => setEditInstructor(instructor.id)}
              >
                <Edit size={14} />
                <span>Editar</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 gap-1 border-destructive text-destructive"
              >
                <Trash2 size={14} />
                <span>Eliminar</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredInstructors.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No se encontraron instructores que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
      
      {/* Edit instructor dialog */}
      <Dialog open={editInstructor !== null} onOpenChange={(open) => !open && setEditInstructor(null)}>
        <DialogContent className="sm:max-w-[500px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">
              Editar Instructor
            </DialogTitle>
            <DialogDescription>
              Actualiza la información del instructor.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInstructor && (
            <form onSubmit={handleEditInstructor} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Nombre completo</label>
                  <Input id="edit-name" defaultValue={selectedInstructor.name} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
                  <Input id="edit-email" type="email" defaultValue={selectedInstructor.email} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-phone" className="text-sm font-medium">Teléfono</label>
                  <Input id="edit-phone" defaultValue={selectedInstructor.phone} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-bio" className="text-sm font-medium">Biografía</label>
                  <textarea 
                    id="edit-bio" 
                    className="form-input min-h-[100px]" 
                    defaultValue={selectedInstructor.bio}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-photo" className="text-sm font-medium">URL de la foto</label>
                  <Input id="edit-photo" defaultValue={selectedInstructor.photo} />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setEditInstructor(null)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Guardar Cambios
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Instructores;
