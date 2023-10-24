-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2023 a las 13:07:00
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pracdevcamp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `id` int(11) NOT NULL,
  `url_foto` varchar(300) COLLATE utf8_bin NOT NULL,
  `titulo` varchar(30) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_bin NOT NULL,
  `estado_foto` varchar(15) COLLATE utf8_bin NOT NULL DEFAULT 'Aprobada',
  `fecha_foto` date NOT NULL,
  `fecha_foto_subida` date NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `fotos`
--

INSERT INTO `fotos` (`id`, `url_foto`, `titulo`, `descripcion`, `estado_foto`, `fecha_foto`, `fecha_foto_subida`, `usuario_id`) VALUES
(1, 'https://res.cloudinary.com/dwuug0hqs/image/upload/v1693214597/recuerdos/hombre_yu8uze.jpg', 'Yo mismo', 'Cuando era joven tenía barba y me gustaba llevar gafas.', 'Aprobada', '2002-06-15', '2023-08-28', 1),
(3, 'https://res.cloudinary.com/dwuug0hqs/image/upload/v1693214222/recuerdos/grupo2_p3vkoy.jpg', 'cuadrilla', 'Viajando con la cuadrilla por Italia.\r\nHaciendo vida bohemia.', 'Aprobada', '2003-04-23', '2023-08-29', 1),
(4, 'https://res.cloudinary.com/dwuug0hqs/image/upload/v1693214228/recuerdos/grupo3_kaeb4a.jpg', 'paseo zoco', 'Paseando por el zoco con Lucia en Marraketch.\r\nDía soleado pero agradable. Había muchos puestos para comprar un montón de cosas.', 'Aprobada', '2013-08-20', '2023-04-19', 1),
(5, 'https://res.cloudinary.com/dwuug0hqs/image/upload/v1693214600/recuerdos/mujer1_ni1e3s.jpg', 'Mujer', 'Cuando fui con Juanma a Marraketch aproveché para comprarme un bonito pañuelo para la cabeza.', 'Aprobada', '2013-08-21', '2023-06-16', 2),
(6, 'https://res.cloudinary.com/dwuug0hqs/image/upload/v1693214232/recuerdos/grupo5_vcvtpv.jpg', 'tres amigas', 'Mis amigas y yo de celebración.\r\nDisfrutando de una noche loca.', 'Aprobada', '2022-05-17', '2022-05-25', 2),
(7, 'https://res.cloudinary.com/dwuug0hqs/image/upload/v1693214236/recuerdos/grupo7_obhivz.jpg', 'Foto de Mertxe', 'Tomando un café con Lucia y Juanma en el centro de Irún en la cafetería de un amigo en común.', 'Aprobada', '2022-03-17', '2023-10-20', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias`
--

CREATE TABLE `historias` (
  `id` int(11) NOT NULL,
  `historia` text COLLATE utf8_bin NOT NULL,
  `fecha_historia` date NOT NULL,
  `foto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `historias`
--

INSERT INTO `historias` (`id`, `historia`, `fecha_historia`, `foto_id`, `usuario_id`) VALUES
(1, 'historia 1', '2023-10-05', 1, 1),
(2, 'historia 1', '2023-10-05', 5, 1),
(3, 'historia 1', '2023-10-05', 7, 1),
(4, 'historia 2', '2023-09-04', 1, 2),
(5, 'historia 2', '2023-09-04', 5, 2),
(6, 'historia 2', '2023-09-04', 7, 2),
(7, 'historia 3', '2023-10-01', 1, 3),
(8, 'historia 3', '2023-09-20', 3, 3),
(19, 'Otra historia', '2023-10-20', 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `megusta`
--

CREATE TABLE `megusta` (
  `id` int(11) NOT NULL,
  `foto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `megusta`
--

INSERT INTO `megusta` (`id`, `foto_id`, `usuario_id`) VALUES
(2, 1, 2),
(3, 1, 4),
(5, 3, 3),
(6, 3, 4),
(7, 3, 5),
(8, 4, 2),
(9, 4, 3),
(10, 4, 5),
(11, 5, 2),
(12, 6, 4),
(13, 6, 5),
(31, 3, 1),
(49, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quienes`
--

CREATE TABLE `quienes` (
  `id` int(11) NOT NULL,
  `foto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `quienes`
--

INSERT INTO `quienes` (`id`, `foto_id`, `usuario_id`) VALUES
(1, 1, 1),
(2, 3, 1),
(3, 3, 5),
(4, 4, 1),
(5, 4, 2),
(6, 5, 2),
(7, 6, 2),
(8, 6, 3),
(9, 6, 4),
(48, 7, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(40) COLLATE utf8_bin NOT NULL,
  `perfil` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `perfil`) VALUES
(1, 'Juanma', 'juanma@email.com', '202cb962ac59075b964b07152d234b70', 'administrador'),
(2, 'Lucia', 'lucia@correo.es', '250cf8b51c773f3f8dc8b4be867a9a02', 'corrector'),
(3, 'Mertxe', 'mertxe@email.com', '202cb962ac59075b964b07152d234b70', 'usuario'),
(4, 'Carol', 'carol@email.com', '202cb962ac59075b964b07152d234b70', 'usuario'),
(5, 'Victor', 'victor@email.com', '202cb962ac59075b964b07152d234b70', 'corrector');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fotos_usuario_fk` (`usuario_id`) USING BTREE;

--
-- Indices de la tabla `historias`
--
ALTER TABLE `historias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historias_foto_fk` (`foto_id`) USING BTREE,
  ADD KEY `historias_usuario_fk` (`usuario_id`) USING BTREE;

--
-- Indices de la tabla `megusta`
--
ALTER TABLE `megusta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `megusta_foto_fk` (`foto_id`) USING BTREE,
  ADD KEY `megusta_usuario_fk` (`usuario_id`) USING BTREE;

--
-- Indices de la tabla `quienes`
--
ALTER TABLE `quienes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quienes_usuario_fk` (`usuario_id`) USING BTREE,
  ADD KEY `quienes_foto_fk` (`foto_id`) USING BTREE;

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `historias`
--
ALTER TABLE `historias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `megusta`
--
ALTER TABLE `megusta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `quienes`
--
ALTER TABLE `quienes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `historias`
--
ALTER TABLE `historias`
  ADD CONSTRAINT `historias_foto_fk` FOREIGN KEY (`foto_id`) REFERENCES `fotos` (`id`),
  ADD CONSTRAINT `historias_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `megusta`
--
ALTER TABLE `megusta`
  ADD CONSTRAINT `megusta_foto_fk` FOREIGN KEY (`foto_id`) REFERENCES `fotos` (`id`),
  ADD CONSTRAINT `megusta_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `quienes`
--
ALTER TABLE `quienes`
  ADD CONSTRAINT `quienes_foto_fk` FOREIGN KEY (`foto_id`) REFERENCES `fotos` (`id`),
  ADD CONSTRAINT `quienes_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
