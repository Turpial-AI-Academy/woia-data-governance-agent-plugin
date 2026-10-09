# Accepted focused source contract


Generic method resources extracted from the accepted standard. Mandatory 5NF is domain-contract dependent; Real Estate strict semantics and 85 relations remain in woia-re-domain-contracts. No universal schema/backend is prescribed.

## 3. Qué significa cumplir las formas normales

### Vocabulario mínimo

- **Dependencia funcional, X → Y:** coincidir en X obliga a coincidir en Y en toda situación válida del dominio.
- **Superclave:** conjunto de atributos que determina todos los atributos de la relación.
- **Clave candidata:** superclave mínima; quitarle un atributo hace que deje de ser clave. Puede haber varias.
- **Atributo primo:** pertenece a alguna clave candidata.
- **Dependencia multivaluada, X ↠ Y:** fijado X, los valores de Y son independientes de los restantes atributos. No equivale simplemente a “hay muchos registros”.
- **Dependencia de reunión:** la relación coincide exactamente con la reunión natural de determinadas proyecciones; describe qué combinaciones completas quedan determinadas por esas proyecciones.
- **Dependencia trivial:** X → Y es trivial si Y está incluido en X; X ↠ Y es trivial si Y está incluido en X o si X junto con Y abarca todos los atributos de la relación.

Las dependencias se justifican con reglas del negocio y su alcance temporal. Un patrón observado puede refutar una regla, pero la ausencia de contraejemplos en una muestra no la convierte en una ley del dominio. [T1] [T2] [T3]

### Criterio formal y aplicación

| Nivel | Criterio que debe revisarse | Traducción práctica |
|---|---|---|
| **1FN** | Valores de dominios definidos, sin grupos repetidos ni relaciones anidadas dentro de la relación canónica. | Las colecciones con identidad, consultas o restricciones propias deben modelarse expresamente. |
| **2FN** | En 1FN, cada atributo no primo depende de cada clave candidata completa, sin dependencia de una parte propia de ella. | Un dato de la persona no se repite como dato actual en cada participación contractual. |
| **3FN** | Para cada X → A: la dependencia es trivial, X es superclave o A es primo. | Se eliminan dependencias transitivas impropias, conservando las excepciones que reconoce la definición formal. |
| **FNBC / BCNF** | En toda dependencia funcional no trivial, el determinante es superclave. | Se revisan también conflictos entre claves candidatas que 3FN puede admitir. |
| **4FN** | En toda dependencia multivaluada no trivial, el determinante es superclave. | No se mezclan en una tabla conjuntos independientes que obliguen a repetir combinaciones. |
| **5FN / PJNF** | Toda dependencia de reunión válida es consecuencia del conjunto de dependencias de las claves candidatas. | Las relaciones se descomponen cuando las reglas reales de combinación lo justifican, sin inventar asociaciones. |

La revisión comprende todas las claves candidatas, no solamente la primaria elegida. FNBC es una comprobación adicional necesaria en el recorrido hacia 5FN. [T1] [T2] [T3] [T4]

### Instrucciones que evitan errores frecuentes

1. No agregar un identificador artificial para ocultar dependencias de negocio que siguen existiendo.
2. No dividir automáticamente toda relación de tres o más entidades en relaciones binarias.
3. No asumir que una tabla binaria o una tabla con clave primaria simple está automáticamente en 5FN.
4. No fragmentar nombres, direcciones o textos hasta volverlos artificialmente “indivisibles”. El dominio y los usos determinan su representación.
5. No esconder relaciones canónicas dentro de JSON o listas para evitar claves, referencias o restricciones.
6. Conservar JSON original de una fuente cuando sea evidencia útil. Los valores aceptados que gobiernen decisiones deben disponer de contratos y controles adecuados.
7. Definir nulabilidad y significado de ausencia. “Desconocido”, “no informado”, “no aplica”, cero y falso no son equivalentes.
8. Explicitar cómo la implementación SQL maneja duplicados y NULL. Una consulta con DISTINCT no sustituye una clave de negocio ni demuestra que un join preserve importes y cardinalidades.

## 4. Dos propiedades que deben comprobarse por separado

### 4.1 Descomposición sin pérdida

Para toda instancia válida r de la relación:

**r = reunión de sus proyecciones sobre R₁, …, Rₙ.**

La reconstrucción debe recuperar exactamente los hechos originales: ni perder asociaciones ni introducir combinaciones adicionales. La demostración puede apoyarse en dependencias aceptadas y técnicas formales apropiadas; los casos de prueba aportan evidencia complementaria. [T2] [T3]

La futura revisión debe incluir contraejemplos deliberados. Si una combinación prohibida aparece al reunir las tablas propuestas, la descomposición es incorrecta para ese dominio.

### 4.2 Preservación de dependencias

También debe comprobarse que las restricciones originales continúen siendo exigibles después de separar las relaciones. Reconstruir sin pérdida no garantiza por sí solo esa propiedad.

Ejemplo abstracto ilustrativo:

- Relación R(A, B, C).
- Reglas AB → C y C → B.
- Descomposición en (C, B) y (A, C).

La descomposición es sin pérdida bajo C → B. Sin embargo, la regla AB → C no queda garantizada solamente por las dependencias funcionales locales. Podrían coexistir (A1, C1), (A1, C2), (C1, B1) y (C2, B1), reconstruyendo dos C para el mismo par A1, B1.

**Instrucción:** registrar qué restricciones se preservan localmente y cuáles necesitan coordinación transaccional. Si una regla no puede garantizarse con el diseño propuesto, se debe revisar la solución; no se elimina la regla para conseguir una etiqueta de normalización. [T5]

## 6. Ficha obligatoria de revisión de cada relación

La futura documentación de diseño de cada relación canónica de Real Estate debe aportar la siguiente evidencia dentro de los artefactos aplicables de Software, revisada por Data y por el responsable semántico. Esta ficha no crea otra metodología ni otro registro de bloqueadores.

| Campo | Contenido requerido |
|---|---|
| Identidad y versión | Relación revisada y versión exacta de sus reglas. |
| Hecho representado | Una frase precisa sobre qué afirma una fila. |
| Alcance | Organización operadora, contexto de negocio y significado temporal. |
| Responsable | Dueño del significado y revisor de integridad. |
| Atributos y dominios | Tipos, unidades, nulabilidad, colecciones y estados desconocidos. |
| Claves candidatas | Todas las claves candidatas derivadas de las reglas aceptadas, su minimalidad y ámbito de unicidad. |
| Dependencias funcionales | Reglas aceptadas, determinantes y consecuencias utilizadas. |
| Dependencias multivaluadas | Independencias justificadas, límites y contraejemplos. |
| Dependencias de reunión | Regla que determina las combinaciones completas y relación con las claves. |
| Descomposición | Justificación de cada separación y prueba de reconstrucción exacta. |
| Restricciones | Qué se exige en cada relación y qué necesita coordinación entre relaciones. |
| Resultado por nivel | CUMPLE, INCUMPLE o PENDIENTE, con evidencia; la falta de definición no se marca como cumplimiento. |
| Seguridad | Principales, operaciones, ámbitos, campos, finalidades y restricciones de acceso. |
| Cambios e historia | Versionado, corrección, eliminación autorizada, conciliación y consumidores afectados. |
| Derivados | Proyecciones, cachés y reportes asociados, con origen y vigencia. |
| Evidencia posterior | Pruebas de integridad, permisos, concurrencia y reconstrucción para la implementación concreta. |

Las comprobaciones del diseño se apoyan en reglas explícitas. Las pruebas con datos representativos y adversos se ejecutarán sobre la implementación cuando corresponda; sus resultados deben identificar el candidato exacto evaluado.

## 8. Seguridad de la base de datos y de sus accesos

### 8.1 Autorización antes de recuperar los datos

Cada acceso debe comprobar principal autenticado, organización, operación, recurso, relación o rol aplicable, campos solicitados, propósito y permisos vigentes. Se deniega cuando falta autorización suficiente.

El control debe ocurrir en el servidor o proveedor determinista, antes de entregar datos al agente o modelo. Ocultar datos en la respuesta final no corrige una lectura indebida previa. Un ID difícil de adivinar tampoco autoriza a utilizarlo.

La cobertura incluye pantallas, herramientas de agentes, procesos diferidos, importaciones, búsquedas, vistas, exportaciones y archivos. La política debe poder expresar relaciones y contexto además de roles generales. [T6] []

**Ejemplo de aceptación:** una persona autorizada para gestionar una visita accede a los datos necesarios del inmueble y del contacto, conservando las restricciones sobre cuentas bancarias, garantías y expedientes laborales.

### 8.2 Identidades técnicas y mínimo privilegio

Se deben separar las funciones de ejecución ordinaria, migración, administración y respaldo, con cuentas y permisos adecuados a cada entorno. Las credenciales habituales de la aplicación no deben ser superusuario, propietario con facultades amplias ni una cuenta común de administración.

Los accesos a la base se limitan a componentes y redes autorizados. Las conexiones remotas usan cifrado de transporte y verifican el certificado del servidor. Los componentes, extensiones y mecanismos de autenticación deben tener una política de actualización y revisión aplicable a la versión desplegada. [T7]

Tener acceso técnico a la base, instalar un plugin o pertenecer a Data no concede facultades para aceptar un pago, cambiar un beneficiario o eliminar evidencia retenida. Los comandos deben volver a comprobar la autoridad de negocio correspondiente. []

### 8.3 Consultas e instrucciones de agentes

Los valores de SQL se transmiten mediante parámetros. Los identificadores dinámicos —tablas, columnas u ordenamientos— se eligen entre opciones permitidas; no se concatenan entradas libres del usuario o del modelo. La parametrización no reemplaza la autorización del recurso. [T8]

Los agentes deben utilizar capacidades con entradas, salidas y permisos definidos. Sus operaciones habituales no deben convertirse en ejecución de SQL privilegiado generado libremente. Cualquier capacidad de consulta analítica requiere alcance, campos, costo y recursos limitados.

Un mensaje, documento, resultado de búsqueda o payload externo se trata como material de entrada. Su contenido no puede alterar permisos, elegir una cuenta privilegiada o instruir al proveedor a ignorar restricciones.

### 8.4 Protección de secretos y contenido

Las credenciales y claves se administran fuera de repositorios, prompts, logs y respuestas de herramientas. Se utiliza la referencia al secreto cuando sea necesario vincular una configuración.

La protección de datos sensibles almacenados debe incluir base, copias, archivos y exportaciones según la clasificación y amenazas aceptadas. Se deben definir gestión de claves, acceso, rotación y recuperación; las claves requieren protección separada del uso ordinario de los datos. [T7] [T9]

Desarrollo y pruebas deben usar datos sintéticos o un proceso expresamente aprobado de preparación de datos. Se debe impedir que un respaldo de producción se convierta en una copia de libre acceso para desarrollo.

### 8.5 Auditoría y conservación

La evidencia de cambios debe identificar actor, operación, recurso, alcance, momento, versión y resultado, vinculados a los IDs existentes de trabajo y efecto cuando corresponda. La auditoría debe permitir investigar accesos sensibles, cambios de permisos y acciones administrativas sin crear otro maestro del negocio.

Los logs deben minimizar contenido: no registrar tokens, contraseñas, cadenas de conexión, documentos completos ni datos bancarios íntegros por defecto. Su acceso y alteración deben estar controlados; también deben contemplarse fallos y manipulación de entradas de log. [T10]

Legal / Compliance define las obligaciones aplicables de conservación y restricción. Data las traduce a categorías y reglas; Technology y Software instrumentan su cumplimiento. La política debe abarcar derivados, búsquedas, exportaciones y copias, incluidos los plazos y procedimientos que correspondan a backups. No se impone retención indefinida ni eliminación de evidencia sujeta a una restricción vigente. []

### 8.6 Revocación y accesos diferidos

Un trabajo preparado con permisos válidos debe revalidar las condiciones materiales antes del efecto protegido. Una revocación, cambio de destinatario, versión, importe o contexto puede invalidar la ejecución.

La identidad de negocio y la identidad autenticada son diferentes. Fusionar registros de personas no une automáticamente sus cuentas de acceso ni amplía permisos.

Cachés, enlaces a archivos, vistas y trabajos pendientes deben conservar los límites de acceso después de un cambio de rol o una baja. La estrategia concreta de revocación y expiración se debe verificar, no suponer.

## 10. Rendimiento y escalabilidad del modelo normalizado

### 10.1 Medir necesidades concretas

Antes de elegir distribución física o prometer capacidad, se debe acordar un perfil de carga con:

- Cantidad y crecimiento de inmuebles, contratos, personas, operaciones, mensajes y documentos.
- Concurrencia de usuarios, agentes, importaciones y trabajos diferidos.
- Consultas críticas y mezcla entre lecturas y escrituras.
- Latencia objetivo y máximos aceptables para operaciones relevantes.
- Frescura necesaria por caso de uso.
- Ventanas de mantenimiento, disponibilidad, costo y objetivos de recuperación.

Los valores siguen pendientes de definición con el negocio y Technology. No se inventan millones de registros, tiempos de respuesta, número de servidores o presupuestos como si fueran requisitos aceptados. [W10]

### 10.2 Optimización progresiva

La implementación debe medir consultas representativas y sus planes antes de desnormalizar o distribuir datos.

Las primeras decisiones físicas deben considerar índices que correspondan a filtros, joins y ordenamientos reales; recuperación de campos necesarios; paginación consistente; eliminación de consultas repetidas por cada fila; transacciones cortas; conexiones acotadas y trabajos en lotes con puntos de continuación.

Los índices deben justificarse también por su costo en escrituras y almacenamiento. Una tabla pequeña no es una prueba suficiente del comportamiento con volúmenes y distribuciones reales. [T14]

La operación debe observar consultas lentas, esperas de bloqueo, conexiones, saturación, crecimiento, retraso de trabajos y fallos de conciliación. El mantenimiento y las estadísticas forman parte de la capacidad disponible.

### 10.3 Vistas, búsquedas, cachés y analítica

Se permiten representaciones de lectura derivadas cuando exista una necesidad demostrada. Cada una debe declarar:

- Fuente canónica y propietario.
- Versión o punto de corte.
- Regla de transformación.
- Frescura e invalidación.
- Política de acceso.
- Procedimiento de reconstrucción.
- Conducta cuando esté incompleta o desactualizada.

Las decisiones que exijan información vigente —permisos, disponibilidad de fondos o un compromiso incompatible— deben verificarla en la fuente o mecanismo adecuado antes del efecto.

Los KPIs conservan su responsable de negocio. Data garantiza fuentes, dimensiones y reproducción de resultados; no crea una segunda autoridad sobre qué mide cada departamento. []

### 10.4 Réplicas, particiones y distribución

Las réplicas de lectura requieren una política explícita de retraso y de lectura posterior a una escritura. La replicación asíncrona puede mostrar datos atrasados; un cambio de réplica a primaria también exige evaluar los cambios que todavía no se habían replicado. [T16]

El particionado se considera cuando mejore accesos o mantenimiento medidos. Debe preservar unicidad, relaciones y reglas temporales. No se relajan claves de negocio para acomodar un esquema físico.

El sharding u otra distribución se justifica solamente después de identificar el límite que resuelve y cómo preservará aislamiento, transacciones, consultas y recuperación. El número de repositorios o departamentos no determina el número de servicios o bases.

Las instrucciones no seleccionan Kafka, Kubernetes, event sourcing, CQRS ni una base de grafos o vectores. Cualquier necesidad concreta debe demostrar su valor y encajar en el grafo aprobado. [W11]

## 11. Importación, evolución y recuperación

### 11.1 Importaciones y cambios de fuente

Cada incorporación debe identificar origen, alcance, versión, permisos, correspondencias y reglas de aceptación. Se deben conservar los IDs y tiempos originales, separar datos rechazados o ambiguos y producir una conciliación comprensible.

La comparación debe incluir conteos por alcance, identidades, relaciones, duplicados, valores ausentes y totales pertinentes. En dinero, se concilian posiciones e importes por moneda, período y titularidad; un total global coincidente no demuestra correspondencia correcta.

Antes de transferir la autoridad de escritura, se debe aceptar el corte efectivo, un único escritor para ese alcance y el tratamiento de entradas tardías y correcciones. Se evita la sincronización bidireccional ilimitada donde simplemente gana el último cambio. []

### 11.2 Evolución del esquema

Los cambios deben estar versionados, revisados y vinculados a contratos y consumidores. Se evaluarán compatibilidad, duración, bloqueos, crecimiento temporal y formas de recuperación.

Cuando existan consumidores con distintas versiones, el diseño debe prever una transición compatible: incorporar lo necesario, trasladar y conciliar, cambiar los consumidores y retirar lo obsoleto cuando sea seguro. Ese patrón es una decisión de implementación dentro del método de Software; no autoriza una migración concreta ahora.

La revisión debe considerar reanudación de lotes, repetición segura, verificación de restricciones y fallos a mitad de operación. No se declara compatible un cambio porque el motor acepte su DDL.

La vuelta atrás requiere una estrategia real. Restaurar datos antiguos o revertir código no deshace pagos, mensajes, firmas ni cambios realizados por terceros.

### 11.3 Respaldo y recuperación

Technology y Data deben acordar con el negocio:

- **RPO:** pérdida máxima de datos que se puede tolerar, expresada como objetivo de recuperación.
- **RTO:** tiempo objetivo para recuperar la operación.
- Alcance de bases, archivos, configuración, claves y permisos que se necesitan.
- Protección, acceso, localización y conservación de las copias.
- Forma de detectar copias incompletas y de comprobar restauraciones.
- Responsables y criterios para reanudar el servicio.

Una réplica no reemplaza la estrategia de respaldo. La copia debe poder recuperarse aun frente al tipo de incidente que pretende cubrir.

La aceptación requiere un ejercicio de restauración aislado y verificable. Se comprueban identidades, relaciones, restricciones, importes, documentos, versiones y permisos. Las revocaciones vigentes y los efectos externos se concilian antes de reactivar ejecución. Un respaldo creado correctamente no demuestra que esa recuperación haya funcionado. []

Si varias organizaciones comparten infraestructura, recuperar datos de una no debe exponer o sobrescribir los de otra. El mecanismo de recuperación selectiva, cuando sea necesario, debe diseñarse y probarse con ese límite.
