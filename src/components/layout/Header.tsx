
import { Bell, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classTypes, instructors, intensityLevels } from '@/utils/data';
import { toast } from 'sonner';

const Header = () => {
  const [open, setOpen] = useState(false);
  
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast.success('Clase creada con éxito');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-medium">Administrador</h2>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle size={16} />
                <span>Nueva Clase</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] animate-scale-in">
              <DialogHeader>
                <DialogTitle className="text-xl font-display">Crear Nueva Clase</DialogTitle>
                <DialogDescription>
                  Complete los detalles para crear una nueva clase en el calendario.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleCreateClass} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="class-type" className="text-sm font-medium">Tipo de Clase</label>
                    <Select>
                      <SelectTrigger id="class-type">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {classTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Descripción</label>
                    <textarea 
                      id="description" 
                      className="form-input min-h-[80px]" 
                      placeholder="Breve descripción de la clase"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="intensity" className="text-sm font-medium">Intensidad</label>
                      <Select>
                        <SelectTrigger id="intensity">
                          <SelectValue placeholder="Nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          {intensityLevels.map((level) => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="capacity" className="text-sm font-medium">Capacidad</label>
                      <input 
                        type="number" 
                        id="capacity" 
                        className="form-input" 
                        placeholder="Máx. alumnos" 
                        min="1" 
                        max="30"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="instructor" className="text-sm font-medium">Instructor</label>
                    <Select>
                      <SelectTrigger id="instructor">
                        <SelectValue placeholder="Seleccionar instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id.toString()}>
                            {instructor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Fecha</label>
                      <input type="date" id="date" className="form-input" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium">Hora</label>
                      <input type="time" id="time" className="form-input" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Crear Clase
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
