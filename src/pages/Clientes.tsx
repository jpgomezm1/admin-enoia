
import { useState } from 'react';
import { clients } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, User, Mail, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from '@/utils/data';
import { toast } from 'sonner';

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyDialog, setHistoryDialog] = useState<number | null>(null);
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.phone && client.phone.includes(searchTerm))
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Cliente añadido con éxito');
  };
  
  const openHistoryDialog = (id: number) => {
    setHistoryDialog(id);
  };
  
  const selectedClient = historyDialog !== null ? clients.find(c => c.id === historyDialog) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-display">Clientes</h1>
        <p className="text-muted-foreground">Gestiona el directorio de clientes.</p>
      </div>
      
      {/* Search and add */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              <span>Añadir Cliente</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-xl font-display">Añadir Nuevo Cliente</DialogTitle>
              <DialogDescription>
                Complete los detalles para añadir un nuevo cliente al directorio.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddClient} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nombre completo</label>
                  <Input id="name" placeholder="Ej. María García" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="ejemplo@correo.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Teléfono (opcional)</label>
                  <Input id="phone" placeholder="+34 600 000 000" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Notas (opcional)</label>
                  <textarea 
                    id="notes" 
                    className="form-input min-h-[80px]" 
                    placeholder="Información relevante sobre el cliente"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button type="submit">
                  Añadir Cliente
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Client cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">{client.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-1">
                  <Mail size={14} className="text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <div className="flex items-center gap-2">
                <User size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {client.history.length} {client.history.length === 1 ? 'clase asistida' : 'clases asistidas'}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => openHistoryDialog(client.id)}>
                Ver historial
              </Button>
              <Button size="sm">
                Contactar
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredClients.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No se encontraron clientes que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
      
      {/* Client history dialog */}
      <Dialog open={historyDialog !== null} onOpenChange={(open) => !open && setHistoryDialog(null)}>
        <DialogContent className="sm:max-w-[600px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">
              Historial de {selectedClient?.name}
            </DialogTitle>
            <DialogDescription>
              Lista de todas las clases a las que ha asistido este cliente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {selectedClient && selectedClient.history.length > 0 ? (
              <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">Clase</th>
                      <th className="table-header-cell">Fecha</th>
                      <th className="table-header-cell">Instructor</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {selectedClient.history.map((history, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell">{history.className}</td>
                        <td className="table-cell">{formatDate(history.date)}</td>
                        <td className="table-cell">{history.instructor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Este cliente aún no ha asistido a ninguna clase.
              </p>
            )}
            
            <div className="flex justify-end pt-4">
              <Button onClick={() => setHistoryDialog(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clientes;
