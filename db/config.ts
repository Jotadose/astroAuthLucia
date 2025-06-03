import { defineDb, defineTable, column } from 'astro:db';


const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

const Cliente = defineTable({
  columns: {
    id_cliente: column.number({ primaryKey: true }),
    nombre_cliente: column.text(),
    a_paterno: column.text(),
    a_materno: column.text(),
    direccion: column.text(),
    telefono: column.number(),
    correo: column.text(),
  },
});

const Venta = defineTable({
  columns: {
    id_venta: column.number({ primaryKey: true }),
    id_cliente: column.number({ references: () => Cliente.columns.id_cliente }),
    fecha_venta: column.date(),
    total_venta: column.number(),
    tipo_pago: column.text(),
  },
});

const Productos = defineTable({
  columns: {
    id_producto: column.text({ primaryKey: true }),
    nombre_producto: column.text(),
    precio: column.number(),
  },
});

const VentaProducto = defineTable({
  columns: {
    id_ventaProducto: column.number({ primaryKey: true }),
    
    id_venta: column.number({ references: () => Venta.columns.id_venta }),
  },
});

const Devolucion = defineTable({
  columns: {
    id_devolucion: column.number({ primaryKey: true }),
    id_venta: column.number({ references: () => Venta.columns.id_venta }),
    fecha_devolucion: column.date(),
  },
});

const CatProductos = defineTable({
  columns: {
    id_categoria: column.number({ primaryKey: true }),
    nombre_categoria: column.text(),
    nombre_familia: column.text(),
  },
});

const Proveedor = defineTable({
  columns: {
    id_proveedor: column.number({ primaryKey: true }),
    
    nombre_proveedor: column.text(),
  },
});

const Inventario = defineTable({
  columns: {
    id_inventario: column.number({ primaryKey: true }),
    
    
    
  }
})

const Todo = defineTable({
  columns: {
    id: column.text(),
    title: column.text(),
    stock: column.text(),
    fecha: column.text(),
    description: column.text()
  }
})

export default defineDb({
  tables: {
    User,
    Session,
    Cliente,
    Venta,
    Productos,
    VentaProducto,
    Devolucion,
    CatProductos,
    Proveedor,
    Inventario,
    Todo
  },
});
