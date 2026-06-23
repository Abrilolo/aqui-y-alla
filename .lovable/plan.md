Plan: Conectar Aquí y Allá a un repositorio de GitHub

Objetivo
Vincular el proyecto actual con un repositorio nuevo en GitHub para tener copia del código, historial de cambios y poder trabajar desde fuera de Lovable.

Pasos
1. Autorizar la app de Lovable en GitHub
   - Abrir el menú Plus (+) en el input del chat → GitHub → Connect project.
   - Autorizar a la GitHub App de Lovable en la cuenta deseada.

2. Crear el repositorio
   - Seleccionar la cuenta u organización de GitHub.
   - Crear un repositorio nuevo desde Lovable.
   - Confirmar nombre del repo (se puede ajustar antes de crearlo).

3. Verificar la sincronización inicial
   - Lovable empujará el código base automáticamente.
   - Revisar que el repo contenga los archivos principales: src/, package.json, etc.

4. Documentar el acceso local (opcional)
   - Copiar la URL del repositorio.
   - Si el usuario quiere clonar localmente, indicar: git clone <url> y luego bun install.

Notas técnicas
- La sincronización es bidireccional: cambios en Lovable se reflejan en GitHub y viceversa.
- No hace falta configurar manualmente deploy keys, webhooks ni CI.
- El historial de versiones de Lovable sigue disponible como respaldo.
- Para desarrollar localmente se recomienda usar bun como gestor de paquetes, ya que el proyecto usa bun.lock.