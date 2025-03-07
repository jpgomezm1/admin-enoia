
import { useState } from 'react';
import { reservations, classes, clients, formatShortDate } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Trash2, MessageSquare, UserPlus } from 'lucide-react';
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
import { toast } from 'sonner';

const Reservas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<number | null>(null);
  
  const filteredReservations = reservations.filter(reservation => 
    reservation.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.class.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddDialogOpen(false);
    toast.success('Reserva añadida con éxito');
  };
  
  const handleDeleteReservation = () => {
    setIsDeleteDialogOpen(false);
    toast.success('Reserva eliminada con éxito');
  };
  
  const openDeleteDialog = (id: number) => {
    setSelectedReservation(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-display">Reservas</h1>
        <p className="text-muted-foreground">Gestiona todas las reservas de clases.</p>
      </div>
      
      {/* Search and add */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por cliente o clase..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus size={16} />
              <span>Añadir Reserva</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-xl font-display">Añadir Nueva Reserva</DialogTitle>
              <DialogDescription>
                Complete los detalles para crear una nueva reserva.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddReservation} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="client" className="text-sm font-medium">Cliente</label>
                  <Select>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="class" className="text-sm font-medium">Clase</label>
                  <Select>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Seleccionar clase" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name} - {formatShortDate(cls.date)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Notas (opcional)</label>
                  <textarea 
                    id="notes" 
                    className="form-input min-h-[80px]" 
                    placeholder="Cualquier información adicional"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Añadir Reserva
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Reservations table */}
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Cliente</th>
              <th className="table-header-cell">Clase</th>
              <th className="table-header-cell">Fecha</th>
              <th className="table-header-cell">Instructor</th>
              <th className="table-header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="table-row">
                <td className="table-cell font-medium">{reservation.client.name}</td>
                <td className="table-cell">{reservation.class.name}</td>
                <td className="table-cell">{formatShortDate(reservation.class.date)}</td>
                <td className="table-cell">{reservation.class.instructor.name}</td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button 
                      className="p-1 text-muted-foreground hover:text-primary transition-colors"
                      title="Enviar mensaje"
                    >
                      <MessageSquare size={16} />
                    </button>
                    <button 
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      title="Eliminar reserva"
                      onClick={() => openDeleteDialog(reservation.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan={5} className="table-cell text-center py-8 text-muted-foreground">
                  No se encontraron reservas que coincidan con tu búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="cancel-reason" className="text-sm font-medium">Motivo de cancelación (opcional)</label>
              <textarea 
                id="cancel-reason" 
                className="form-input min-h-[80px]" 
                placeholder="Introduce el motivo de la cancelación"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="notify-client" 
                className="mr-2"
              />
              <label htmlFor="notify-client" className="text-sm">
                Notificar al cliente sobre la cancelación
              </label>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDeleteReservation}>
                Eliminar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reservas;
