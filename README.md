# Sistema de Gestión de Licencias - Ingeniería Mecatrónica (UCB)

Este repositorio contiene el código fuente de la página web de gestión de licencias del Departamento de Ingeniería Mecatrónica de la Universidad Católica Boliviana (UCB). El sistema permite a los estudiantes y al personal académico gestionar las solicitudes y aprobaciones de licencias de manera eficiente y centralizada.

## Características

- **Gestión de Licencias:** Solicitud, aprobación y seguimiento de licencias académicas.
- **Roles de Usuario:** Sistema de roles para estudiantes, profesores y administradores.
- **Historial de Solicitudes:** Visualización del historial de licencias solicitadas y aprobadas.
- **Autenticación:** Sistema de autenticación con control de acceso basado en permisos.
- **Notificaciones:** Notificaciones por correo electrónico para mantener informados a los usuarios sobre el estado de sus solicitudes.

## Requisitos Previos

Antes de configurar y ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes:

- Python 3.11.4
- Django 4.2.4
- pip (gestor de paquetes de Python)
- DBsqlite3 (base de datos para desarrollo)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Hinf1nity/licencias-imt.git
    cd licencias-imt
    ```

2. Crea y activa un entorno virtual:

    ```bash
    python -m venv env
    source env/bin/activate   # En Windows: `env\Scripts\activate`
    ```

3. Instala las dependencias del proyecto:

    ```bash
    pip install -r requirements.txt
    ```

4. Configura la base de datos en el archivo `settings.py` y aplica las migraciones necesarias:

    ```bash
    python manage.py migrate
    ```

5. Crea un superusuario para acceder al panel de administración de Django:

    ```bash
    python manage.py createsuperuser
    ```

6. Inicia el servidor de desarrollo:

    ```bash
    python manage.py runserver
    ```

7. Accede a la aplicación desde tu navegador en `http://127.0.0.1:8000/`.

## Estructura del Proyecto

- `page_permisos/`: Configuración principal del proyecto Django.
- `gestion/`: Aplicación principal para la gestión de licencias.
- `consultas/`: Aplicación para ver las licencias de un estudiante.
- `registro/`: Aplicación para el registro de licencias.
- `consulta_permisos_docentes/`: Aplicación para ver las licencias de los estudiantes.
- `login/`: Aplicación de inicio de sesión para los administrativos.
- `logout/`: Aplicación de cierre de sesión para los administrativos.
- `templates/`: Archivos HTML y plantillas de Django.
- `static/`: Archivos estáticos (CSS, JavaScript, imágenes).
- `requirements.txt`: Lista de dependencias del proyecto.

## Cosas por hacer

 1. Usar variables de entorno.
 2. Mejorar la estética.
 3. Poner en funcionamiento el mandado de correos a estudiantes en producción.